import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";

import "../css/Login.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { fetchFavorites } = useMovieContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await loginUser(formData);
    if (response.token) {
      localStorage.setItem("token", response.token);
      await fetchFavorites(); // ⏳ wait for full fetch
      setLoading(false);
      navigate("/");
    } else {
      setLoading(false);
      alert(response.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login in to See your Favourite Movies Generes</h2>
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
        <button type="submit" className="auth-button">
          Login
        </button>
        <p className="auth-link">
          Don't have an account? <a href="/register">Sign up here!</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
