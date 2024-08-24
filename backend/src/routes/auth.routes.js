const express = require("express");
const router = express.Router();
const User = require("../models/User.models");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// Registering or signing up a user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json("wrong password, please try again");
    }
    const JWToken = JWT.sign(
      { _id, username: user.username, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "3d" }
    );
    const { pd, ...info } = user._doc;
    res
      .cookie("token", JWToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout function
router.get("/logout", async(req, res) => {
    try {
        res.clearCookie("token", {
            sameSite: "none",
            secure: true,
        }).status(200).send("User logged out sucessfully")
    } catch (error) {
        res.status(500).json(err)
    }
})

// Refetch
router.get("/refetch", async (req,res) => {
    const token = rew.cookies.token
    JWT.verify(token, process.env.SECRET_KEY, {}, async(err, data) => {
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})

module.exports = router