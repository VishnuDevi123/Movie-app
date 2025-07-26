import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";


import "../css/Login.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await loginUser(formData);
    if (response.token) {
      localStorage.setItem("token", response.token);
      navigate("/");
    } else {
      alert(response.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
