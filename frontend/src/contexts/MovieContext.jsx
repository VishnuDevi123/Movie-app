import { createContext, useContext, useState, useEffect } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../services/api";
import { getPopularMovies as fetchPopular } from "../services/api";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await getFavorites(token);
    setFavorites(res);
  };

  useEffect(() => {
    fetchFavorites(); // load on app start if token exists
  }, []);

  const getPopularMovies = async () => {
    const data = await fetchPopular();
    setMovies(data);
  };

  const resetToPopular = () => {
    setSearchQuery("");
    getPopularMovies();
  };

  const handleAddFavorite = async (movie) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await addFavorite(movie, token);
    if (res.favorites) setFavorites(res.favorites);
  };

  const handleRemoveFavorite = async (movieId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await removeFavorite(movieId, token);
    if (res.favorites) setFavorites(res.favorites);
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        movies,
        setMovies,
        searchQuery,
        setSearchQuery,
        handleAddFavorite,
        handleRemoveFavorite,
        fetchFavorites,
        setFavorites,
        getPopularMovies,
        resetToPopular,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
