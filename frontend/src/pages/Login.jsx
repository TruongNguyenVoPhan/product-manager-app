import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import '../styles/Login.css'; // Assuming you have a CSS file for styles
import { login, getProducts } from '../services/api';

function Login({ onLogin, onSwitchToRegister }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }

    try {
      const res = await axios.post('https://product-api-7ric.onrender.com/auth/login', {
        username,
        password
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      toast.success("Login successful");
      onLogin(token);
    } catch (error) {
      toast.error("Login failed. Please check credentials.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ background: "#F4F4F4" }}>
      <div className="card p-4 shadow" style={{ maxWidth: "400px", borderRadius: "16px", width: "100%" }}>
        <h3 className="mb-4 text-center fw-bold">Sign in to your account</h3>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control mb-3"
          style={{ borderRadius: "8px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-3"
          style={{ borderRadius: "8px" }}
        />

        <button
          onClick={handleLogin}
          className="btn w-100"
          style={{ backgroundColor: "#2F80ED", color: "white", borderRadius: "8px" }}
        >
          Sign In
        </button>

        <p className="text-center mt-2" style={{ fontSize: "14px" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "#2F80ED", cursor: "pointer", fontWeight: "bold" }}
            onClick={onSwitchToRegister}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
