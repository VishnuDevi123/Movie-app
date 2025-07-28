import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "../css/Navbar.css";
import { useMovieContext } from "../contexts/MovieContext";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const navigate = useNavigate();
  const { setFavorites } = useMovieContext();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // use context logout
    setFavorites([]); // clear favorites
    navigate("/login"); // redirect
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>

        {user && (
          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>
        )}

        {user ? (
          <>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
