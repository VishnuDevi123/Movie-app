const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // TMDB movie ID
  title: { type: String, required: true },
  poster_path: { type: String },
  overview: { type: String },
  release_date: { type: String }, // Optional: Add if you're storing this
}, { _id: false }); // Prevent Mongoose from creating _id for each favorite

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  favorites: [favoriteSchema] // Use subdocument schema
});

module.exports = mongoose.model("User", userSchema);
