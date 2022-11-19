const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const base64 = require("crypto-js/enc-base64");

const User = require("../models/User");


router.post("/user/signup", async (req, res) => {
  try {
    
    const { username, email, password, newsletter } = req.body;

    if (username) {
      const userFound = await User.findOne({ email: req.body.email });
      if (!userFound) {
        const generatedToken = uid2(16);
        const generatedSalt = uid2(12);
        const generatedHash = SHA256(password + generatedSalt).toString(base64);
        const newUser = new User({
          email: email,
          account: {
            username: username,
          },
          newsletter: newsletter,
          token: generatedToken,
          hash: generatedHash,
          salt: generatedSalt,
        });
        await newUser.save();
        res.status(201).json({
          _id: newUser._id,
          token: newUser.token,
          account: {
            username: newUser.account.username,
          },
        });
      } else {
        res.status(409).json({ message: "Email already exists" });
      }
    } else {
      res.status(400).json({ message: "We need a username..." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    
    const userFound = await User.findOne({ email: req.body.email });
    if (userFound) {
      
      const generatedHash = SHA256(req.body.password + userFound.salt).toString(
        base64
      );
      
      if (generatedHash === userFound.hash) {
        res.status(200).json({
          _id: userFound._id,
          token: userFound.token,
          account: {
            username: userFound.account.username,
          },
        });
      } else {
        res.status(401).json("incorrect email or password");
      }
    } else {
      res.status(401).json("incorrect email or password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;