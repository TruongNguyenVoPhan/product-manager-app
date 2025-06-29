// src/Register.js
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Register({ onRegisterSuccess }) {
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
      onRegisterSuccess(); // Cho phép chuyển về login
    } catch (error) {
      console.error(error);
      toast.error("Register failed. Username may already exist.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>📝 Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="form-control mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control mb-2"
      />
      <button className="btn btn-primary w-100" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default Register;

