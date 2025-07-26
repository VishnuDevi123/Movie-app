const mongoose = require("mongoose");

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

  favorites: [
    {
      id: { type: Number }, // Movie ID from TMDB
      title: String,
      poster_path: String,
      overview: String
      // Add more fields as needed
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
