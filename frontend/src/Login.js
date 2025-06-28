import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Login({ onLogin }) {
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
      console.error("Login error:", error);
      toast.error("Login failed. Please check username or password.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>🔐 Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <br />
      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
