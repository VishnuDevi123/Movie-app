import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await registerUser(formData);
    if (response.message === "User registered successfully") {
      navigate("/login");
    } else {
      alert(response.message || "Registration failed");
    }
  };

  return (
    <div className = "auth-container">
    <form onSubmit={handleRegister} className="auth-form">
    <h2>Register</h2>
      <input
        type="text"
        name="username"
        className="auth-input"
        placeholder="Username"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        className="auth-input"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        className="auth-input"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit" className="auth-button">Register</button>
    </form>
    </div>
  );
}

export default Register;
