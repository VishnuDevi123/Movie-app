const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/verifyToken');
const User = require('../models/User');
const axios = require('axios');

router.get('/recommendations', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId);
        if (!user || !user.favorites) {
            return res.status(404).json({ message: "User or favorites not found" });
        }

        const favoriteIds = user.favorites.map((fav) => fav.id);

        const response = await axios.post('http://localhost:5001/recommend', {
            favorite_ids: favoriteIds
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;