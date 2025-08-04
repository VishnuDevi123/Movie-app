// controllers/userController.js
const User = require("../models/User");
const path = require("path");

const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.userId; // from verifyToken middleware
    const filePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    console.log("Uploaded file info:", req.file);
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: filePath },
      { new: true }
    );

    res.status(200).json({ message: "Avatar uploaded", avatar: user.avatar });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload avatar, Please upload the avater again" });
  }
};

module.exports = { uploadAvatar };