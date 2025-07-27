import { createContext, useContext, useState, useEffect } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../services/api";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await getFavorites(token);
    setFavorites(res);
  };

  useEffect(() => {
    fetchFavorites(); // load on app start if token exists
  }, []);

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
        handleAddFavorite,
        handleRemoveFavorite,
        fetchFavorites,
        setFavorites,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
