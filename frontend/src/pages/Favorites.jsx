import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import { useAuth } from "../contexts/AuthContext";
import MovieCard from "../components/MovieCard";
import AuthPromptModal from "../components/AuthPromptModal";
import { useState, useEffect } from "react";

function Favorites() {
  const { favorites } = useMovieContext();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowModal(true);
    }
  }, [user]);

  if (!user) {
    return showModal ? (
      <AuthPromptModal onClose={() => setShowModal(false)} />
    ) : (
      <div className="favorites-empty">
        <h2>Favorites are for logged-in users</h2>
        <p>Please login or register to save and view your favorite movies.</p>
      </div>
    );
  }

  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="favorites-empty">
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites and they will appear here!</p>
      </div>
    );
  }
}

export default Favorites;
