import React, { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductManager from './pages/ProductManager';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import API from './services/axiosInstance'


function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = async () => {
  setIsLoggedIn(true);
  toast.success("Login successful!");

  try {
    const res = await API.get('/auth/me');
    setUserInfo(res.data); 
    localStorage.setItem('userInfo', JSON.stringify(res.data));
  } catch (err) {
    toast.error("Failed to load user info");
  }

  navigate("/products");
};

  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      toast.error("Session expired.");
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      setIsLoggedIn(false);
      setUserInfo(null);
      navigate("/login");
    };

    window.addEventListener('tokenExpired', handleLogout);
    window.addEventListener('storage', (e) => {
      if (e.key === 'logout-event') handleLogout();
    });

    return () => {
      window.removeEventListener('tokenExpired', handleLogout);
      window.removeEventListener('storage', handleLogout);
    };
  }, []);




  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo"); // ✅ clear luôn user
    setIsLoggedIn(false);
    setUserInfo(null);
    navigate("/login");
  };


  const handleRegisterSuccess = () => {
    toast.success("Registration successful. Please login!");
    navigate("/login");
  };

  return (
    <>
      <ToastContainer />
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route
              path="/login"
              element={
                <Login
                  onLogin={handleLogin}
                  onSwitchToRegister={() => navigate("/register")}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  onRegisterSuccess={handleRegisterSuccess}
                  onSwitchToLogin={() => navigate("/login")}
                />
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
            <Route
              path="/products"
              element={<ProductManager onLogout={handleLogout} userInfo={userInfo} />}
            />
            <Route path="/profile" element={<UserProfile onLogout={handleLogout} />} />
            <Route path="*" element={<Navigate to="/products" />} />
          </>
        )}
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
