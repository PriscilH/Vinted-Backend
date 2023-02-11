const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
require("dotenv").config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
  api_key: process.env.CLOUDINARY_APY_KEY ,
  api_secret: process.env.CLOUDINARY_APY_SECRET ,
  secure: true,
});

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

// Import du modèle User :
const User = require("./models/User");
// Import du modèle Offer :
const Offer = require("./models/Offer");

// Import des routes :
const userRoutes = require("./routes/user");
app.use(userRoutes);
const offerRoutes = require("./routes/offer");
app.use(offerRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome on my server vinted" });
});
      
app.all("*", (req, res) => {
    try {
      res.status(404).json("Not found");
    } catch (error) {
      res.status(400).json({ message: error.message});
    }
});

app.listen(process.env.PORT, () => {
  console.log("Server is on fire 🔥 on port ");
});