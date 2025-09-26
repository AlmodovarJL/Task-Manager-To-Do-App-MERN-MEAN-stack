import React, { useState } from "react";
import { register, login } from "../services/api";
import "./Auth.css";

function Auth({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = isLogin
        ? await login({ email, password })
        : await register({ email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className={`auth-container ${!isLogin ? "right-panel-active" : ""}`}>
      {/* Register Form */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>

      {/* Login Form */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>

      {/* Overlay Panels */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected, please login with your personal info</p>
            <button
              type="button"
              className="ghost"
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your details and start your journey with us</p>
            <button
              type="button"
              className="ghost"
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
