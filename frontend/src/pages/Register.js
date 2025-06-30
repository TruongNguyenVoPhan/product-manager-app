// src/Register.js
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import '../styles/Register.css'; // (tùy chọn)

function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !password) {
      toast.error("Please enter username and password");
      return;
    }

    try {
      await axios.post("https://product-api-7ric.onrender.com/auth/register", {
        username,
        password,
      });
      toast.success("Register successful. You can now login.");
      onRegisterSuccess(); // trở lại Login
    } catch (error) {
      toast.error("Register failed. Username may already exist.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ background: "#F4F4F4" }}>
      <div className="card p-4 shadow" style={{ maxWidth: "400px", borderRadius: "16px", width: "100%" }}>
        <h3 className="mb-4 text-center fw-bold">Create an account</h3>

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
          onClick={handleRegister}
          className="btn w-100"
          style={{ backgroundColor: "#2F80ED", color: "white", borderRadius: "8px" }}
        >
          Register
        </button>

        <p className="text-center mt-3" style={{ fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#2F80ED", cursor: "pointer", fontWeight: "bold" }}
            onClick={onSwitchToLogin}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
