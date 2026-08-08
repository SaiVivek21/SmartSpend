import { useState } from "react";

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login");

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand centered">
          <div className="brand-mark">₹</div>
          <span>Smart<span>Spend</span></span>
        </div>
        <p className="muted">{mode === "login" ? "Login to your account" : "Create your account"}</p>

        {mode === "signup" && <input placeholder="Full name" />}
        <input placeholder="Email address" type="email" />
        <input placeholder="Password" type="password" />

        <button className="primary-btn" onClick={onLogin}>
          {mode === "login" ? "Login" : "Sign Up"}
        </button>

        <button className="link-btn" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
          {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
