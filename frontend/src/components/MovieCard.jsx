import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { useState } from "react";

function MovieCard({ movie }) {
  const { favorites, handleAddFavorite, handleRemoveFavorite } =
    useMovieContext();

  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  const onFavoriteClick = (e) => {
    e.preventDefault();
    if (isFavorite) {
      handleRemoveFavorite(movie.id);
    } else {
      handleAddFavorite({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        release_date: movie.release_date,
      });
    }
  };

  return (
    <div
      className={`movie-card ${isFlipped ? "flipped" : ""}`}
      onClick={handleCardClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <button
            className={`favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation(); // prevent flipping
              onFavoriteClick(e);
            }}
          >
            ♥
          </button>
        </div>

        <div className="card-back">
          <h3>{movie.title}</h3>
          <p>
            <strong>Overview:</strong>
          </p>
          <p>{movie.overview || "No overview available."}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
