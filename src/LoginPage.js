import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({
  users, loginUsername, setLoginUsername, loginPin, setLoginPin,
  loginError, handleLogin
}) {
  const navigate = useNavigate();

  return (
    <div className="login-container" id="loginPage">
      <div className="login-form">
        <h3 style={{ textAlign: "center", marginBottom: 30, color: "#2d3748" }}>
          Staff Login
        </h3>
        <div className="form-group">
          <label>Select User</label>
          <select
            id="loginUsername"
            value={loginUsername}
            onChange={e => setLoginUsername(e.target.value)}
          >
            <option value="">-- Select Username --</option>
            {Object.entries(users).map(([key, user]) => (
              <option key={key} value={key}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Enter 4-Digit PIN</label>
          <input
            type="password"
            id="loginPin"
            className="pin-input"
            maxLength="4"
            placeholder="••••"
            value={loginPin}
            onChange={e => setLoginPin(e.target.value)}
            onKeyUp={e => e.key === "Enter" && handleLogin()}
          />
        </div>
        {loginError && <div id="loginError" className="error-message">{loginError}</div>}
        <button type="button" className="login-btn" onClick={handleLogin}>
          🔑 Login
        </button>
        <div className="divider">
          <span>OR</span>
        </div>
        <button
          type="button"
          className="add-user-btn"
          onClick={() => navigate("/add-user")}
        >
          👤 Add New User
        </button>
      </div>
    </div>
  );
}