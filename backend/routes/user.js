// routes/user.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadAvatar } = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.patch("/avatar", verifyToken, upload.single("avatar"), uploadAvatar);

module.exports = router;