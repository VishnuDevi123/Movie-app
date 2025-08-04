// src/pages/Profile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { uploadAvatar } from "../services/api.js";
import "../css/Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [avatarFile, setAvatarFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("Decoded user creds: ", user);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleAvatarUpload = async () => {
    if (!avatarFile) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const response = await uploadAvatar(formData);
      if (!response.error) {
        setUploadMessage("Avatar uploaded successfully!");
        window.location.reload();
      } else {
        setUploadMessage("Failed to upload avatar.");
      }
    } catch (error) {
      console.error("Upload failed", error);
      setUploadMessage("Upload failed due to server error.");
    }
    setLoading(false);
  };

  if (!user) return <p>It appears you might have loged out!</p>;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>Welcome, {user.username || user.email}</h2>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
        <p>User ID: {user.userId}</p>

        <img
          src={
            user.avatar
              ? encodeURI(user.avatar)
              : "https://via.placeholder.com/100"
          }
          alt="Profile Avatar"
          width="100"
          style={{ borderRadius: "50%", marginBottom: "1rem" }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatarFile(e.target.files[0])}
        />
        <button onClick={handleAvatarUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload Avatar"}
        </button>
        {uploadMessage && <p>{uploadMessage}</p>}

        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
