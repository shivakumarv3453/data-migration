import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddUserPage({
  newUsername, setNewUsername, newUserPin, setNewUserPin,
  confirmPin, setConfirmPin, addUserError, addUserSuccess, handleAddUser
}) {
  const navigate = useNavigate();

  return (
    <div className="login-container" id="addUserPage">
      <div className="login-form">
        <h3 style={{ textAlign: "center", marginBottom: 30, color: "#2d3748" }}>
          Add New User
        </h3>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            id="newUsername"
            placeholder="Enter full name"
            value={newUsername}
            onChange={e => setNewUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Create 4-Digit PIN</label>
          <input
            type="password"
            id="newUserPin"
            className="pin-input"
            maxLength="4"
            placeholder="••••"
            value={newUserPin}
            onChange={e => setNewUserPin(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Confirm PIN</label>
          <input
            type="password"
            id="confirmPin"
            className="pin-input"
            maxLength="4"
            placeholder="••••"
            value={confirmPin}
            onChange={e => setConfirmPin(e.target.value)}
          />
        </div>
        {addUserError && <div id="addUserError" className="error-message">{addUserError}</div>}
        {addUserSuccess && <div id="addUserSuccess" className="success-message">{addUserSuccess}</div>}
        <button type="button" className="add-user-btn" onClick={handleAddUser}>
          ✅ Create User
        </button>
        <button type="button" className="back-btn" onClick={() => navigate("/login")}>
          ← Back to Login
        </button>
      </div>
    </div>
  );
} 