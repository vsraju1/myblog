const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.models");
const Post = require("../models/Post.models");
const Comment = require("../models/Comments.models");
const JWT = require("jsonwebtoken");
const verifyToken = require("../VerigyToken");

// Update user
router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(err);
  }
});

// Delete User
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete({ userId: req.params.id });
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });
    res.status(200).json("User deleted sucessfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get User
router.get("/:id", async (req, res) => {
  try {
    const user = await findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router
