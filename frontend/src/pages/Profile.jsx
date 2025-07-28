// src/pages/Profile.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return <p>Loading Profile...</p>;

  return (
    <div className="profile-page">
      <div className="profile-content">
        <h2>Welcome, {user.name || user.username || user.email}</h2>
        <p>Email: {user.email}</p>
        <p>User ID: {user.id}</p>
        {/* More features can be added here */}

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
