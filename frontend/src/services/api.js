const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Ensure you have this in your .env file
const BASE_URL = "https://api.themoviedb.org/3";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch popular movies: ${response.status}`);
    }

    const data = await response.json();
    console.log("Popular movies:", data.results);
    return data.results;
  } catch (error) {
    console.error("Error in getPopularMovies:", error);
    return []; // Prevents crash
  }
};

// 📌 Search movies from TMDB
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch search results: ${response.status}`);
    }

    const data = await response.json();
    console.log(" Search results:", data.results);
    return data.results;
  } catch (error) {
    console.error(" Error in searchMovies:", error);
    return []; // Prevents hanging UI
  }
};

// Get favorites from your backend (protected)
export const getFavorites = async (token) => {
  const res = await fetch(`${BACKEND_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

// Add movie to favorites (protected)
export const addFavorite = async (movie, token) => {
  const res = await fetch(`${BACKEND_URL}/favorites/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(movie),
  });
  return res.json();
};

// Remove movie from favorites by movie ID (protected)
export const removeFavorite = async (movieId, token) => {
  const res = await fetch(`${BACKEND_URL}/favorites/remove/${movieId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const loginUser = async (user) => {
  const res = await fetch("http://localhost:5050/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json(); // returns token
};
export const registerUser = async (user) => {
  const res = await fetch("http://localhost:5050/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user), // send the object as-is
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json();
};
