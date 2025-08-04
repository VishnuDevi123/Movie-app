import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import { searchMovies } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/Home.css";

function Home() {
  const {
    movies,
    setMovies,
    searchQuery,
    setSearchQuery,
    getPopularMovies,
  } = useMovieContext();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movies || movies.length === 0) {
      getPopularMovies().finally(() => setLoading(false));
    } else {
      setLoading(false); // Already loaded
    }
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchQuery.trim()) {
      setError("Please enter a search query.");
      return;
    }

    setLoading(true);
    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
      setError(null);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;