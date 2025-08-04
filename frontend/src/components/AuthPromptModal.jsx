// src/components/AuthPromptModal.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/AuthPromptModal.css";

const AuthPromptModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) =>{
    onClose();
    navigate(path);
  }

  return (
    <div className="auth-modal-backdrop">
      <div className="auth-modal">
        <h2>Oops! You're not logged in</h2>
        <p>
          Login or register to save movies to your favorites and access your
          personalized list.
        </p>
        <div className="auth-modal-buttons">
          <button onClick={() => handleNavigate("/login")}>Login</button>
          <button onClick={() => handleNavigate("/register")}>Register</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AuthPromptModal;
