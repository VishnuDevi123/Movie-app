import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "../css/Navbar.css";
import { useMovieContext } from "../contexts/MovieContext";

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const {setFavorites} = useMovieContext();


  const handleLogout = () => {
    localStorage.removeItem("token");
    setFavorites([]); // Clear favorites on logout
    navigate("/login"); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
        {token ? (
          <button className="nav-button" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
