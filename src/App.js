import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import HemodialysisChart from "./HemodialysisChart";
import LoginPage from "./LoginPage";
import AddUserPage from "./AddUserPage";
import "./LoginPage.css";
import LabReportTracker from "./LabReportTracker";

const initialUsers = {
  admin: { name: "Dr. Admin", pin: "1234", role: "Doctor" },
  nurse1: { name: "Nurse Sarah", pin: "5678", role: "Nurse" },
  nurse2: { name: "Nurse John", pin: "9012", role: "Nurse" },
  tech1: { name: "Tech Mike", pin: "3456", role: "Technician" }
};

function AppContent() {
  // Load users from localStorage or use initialUsers
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("staffUsers");
      return saved ? JSON.parse(saved) : initialUsers;
    } catch (err) {
      console.warn("Invalid users JSON in localStorage; resetting", err);
      localStorage.removeItem("staffUsers");
      return initialUsers;
    }
  });

  // Save users to localStorage whenever users change
  useEffect(() => {
    localStorage.setItem("staffUsers", JSON.stringify(users));
  }, [users]);

  const navigate = useNavigate();
  const location = useLocation();
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionTime, setSessionTime] = useState(null);

  // Add user state
  const [newUsername, setNewUsername] = useState("");
  const [newUserPin, setNewUserPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [addUserError, setAddUserError] = useState("");
  const [addUserSuccess, setAddUserSuccess] = useState("");

  // Login function
  function handleLogin() {
    setLoginError("");
    if (!loginUsername || !loginPin) {
      setLoginError("Please select a user and enter the 4-digit PIN.");
      return;
    }
    if (!users[loginUsername] || users[loginUsername].pin !== loginPin) {
      setLoginError("Invalid username or PIN. Please try again.");
      return;
    }
    setCurrentUser(users[loginUsername]);
    setSessionTime(new Date().toLocaleString());
    navigate("/");
    setLoginPin("");
  }

  // Add user function
  function handleAddUser() {
    setAddUserError("");
    setAddUserSuccess("");
    // Name validation: only alphabetic characters and spaces
    if (!newUsername || !/^[A-Za-z ]+$/.test(newUsername)) {
      setAddUserError("Name must contain only letters and spaces.");
      return;
    }
    // PIN validation: exactly 4 digits
    if (!/^\d{4}$/.test(newUserPin)) {
      setAddUserError("PIN must be exactly 4 digits.");
      return;
    }
    // Confirm PIN matches
    if (newUserPin !== confirmPin) {
      setAddUserError("PINs do not match.");
      return;
    }
    let userKey = newUsername.toLowerCase().replace(/\s+/g, "");
    let suffix = 1;
    let uniqueKey = userKey;
    while (users[uniqueKey]) {
      uniqueKey = userKey + suffix;
      suffix++;
    }
    setUsers({
      ...users,
      [uniqueKey]: { name: newUsername, pin: newUserPin, role: "Staff" }
    });
    setAddUserSuccess("User added successfully! You can now login.");
    setNewUsername("");
    setNewUserPin("");
    setConfirmPin("");
  }

  // Logout
  function handleLogout() {
    setCurrentUser(null);
    setSessionTime(null);
    navigate("/login");
  }

  return (
    <div className="container">
      <Routes>
        <Route path="/login" element={
          <LoginPage
            users={users}
            loginUsername={loginUsername}
            setLoginUsername={setLoginUsername}
            loginPin={loginPin}
            setLoginPin={setLoginPin}
            loginError={loginError}
            handleLogin={handleLogin}
          />
        } />
        <Route path="/add-user" element={
          <AddUserPage 
            newUsername={newUsername}
            setNewUsername={setNewUsername}
            newUserPin={newUserPin}
            setNewUserPin={setNewUserPin}
            confirmPin={confirmPin}
            setConfirmPin={setConfirmPin}
            addUserError={addUserError}
            addUserSuccess={addUserSuccess}
            handleAddUser={handleAddUser}
          />
        } />
        <Route path="/" element={currentUser ? <HemodialysisChart /> : <LoginPage users={users} loginUsername={loginUsername} setLoginUsername={setLoginUsername} loginPin={loginPin} setLoginPin={setLoginPin} loginError={loginError} handleLogin={handleLogin} />} />
        <Route path="/lab-report" element={currentUser ? <LabReportTracker /> : <LoginPage users={users} loginUsername={loginUsername} setLoginUsername={setLoginUsername} loginPin={loginPin} setLoginPin={setLoginPin} loginError={loginError} handleLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;