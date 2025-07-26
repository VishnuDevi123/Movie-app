// routes/favorites.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// 📌 GET all favorite movies
router.get("/", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json(user.favorites || []);
});

// 📌 POST to add a favorite
router.post("/add", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.userId);
  const newFavorite = req.body;

  const exists = user.favorites.find((m) => m.id === newFavorite.id);
  if (exists) return res.status(409).json({ message: "Movie already in favorites" });

  user.favorites.push(newFavorite);
  await user.save();

  res.json({ message: "Movie added to favorites", favorites: user.favorites });
});

// 📌 DELETE to remove a favorite
router.delete("/remove/:movieId", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.userId);
  const movieId = parseInt(req.params.movieId);

  user.favorites = user.favorites.filter((m) => m.id !== movieId);
  await user.save();

  res.json({ message: "Movie removed from favorites", favorites: user.favorites });
});
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Protected route accessed!", user: req.user });
});

module.exports = router;
