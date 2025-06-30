import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductManager from './pages/ProductManager';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast.success("Login successful!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleRegisterSuccess = () => {
    toast.success("Registration successful. Please login!");
    setShowRegister(false);
  };

  return (
    <div className="container mt-4">
      <ToastContainer />

      {!isLoggedIn ? (
        showRegister ? (
          <>
            <Register
              onRegisterSuccess={handleRegisterSuccess}
              onSwitchToLogin={() => setShowRegister(false)}
            />
            <p className="text-center mt-3">
              Already have an account?{" "}
              <button className="btn btn-link" onClick={() => setShowRegister(false)}>Login here</button>
            </p>
          </>
        ) : (
          <>
            <Login onLogin={handleLogin} onSwitch={() => setShowRegister(true)} />
            <p className="text-center mt-3">
              Don't have an account?{" "}
              <button className="btn btn-link" onClick={() => setShowRegister(true)}>Register here</button>
            </p>
          </>
        )
      ) : (
        <ProductManager onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
