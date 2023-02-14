const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const isAuthenticated = require("../middlewares/isAuthenticated");


const { convertToBase64, test } = require("../utils/converterB64");
  
const Offer = require("../models/Offer");

router.post("/offer/publish", isAuthenticated, fileUpload(), async(req, res) => {
    try {
        
      const { title, description, price, condition, city, brand, size, color } = 
      req.body;
        
      const pictureToUpload = convertToBase64(req.files.picture);
        const newOffer = new Offer({
            product_name: title,
            product_description: description,
            product_price: price,
            product_details: [
              {
                MARQUE: brand,
              },
              {
                TAILLE: size,
              },
              {
                ÉTAT: condition,
              },
              {
                COULEUR: color,
              },
              {
                EMPLACEMENT: city,
              },
            ],
            owner: req.user,
        });
        
      const result = await cloudinary.uploader.upload(pictureToUpload, {
        folder: `/vinted/offers/${newOffer._id}`,
      });
      newOffer.product_image = result;
      await newOffer.save(); 
        res.status(201).json(newOffer);
    } catch (error) {
        res.status(400).json({ message: error.message });  
    }
});

router.get("/offers", async (req, res) => {
  try {
    const limit = 20;
    
    const filters = {};
    if (req.query.title) {
      filters.product_name = new RegExp(req.query.title, "i");
    }
    
    if (req.query.priceMin) {
      filters.product_price = { $gte: req.query.priceMin };
    }

    if (req.query.priceMax) {
      if (filters.product_price) {
        filters.product_price.$lte = req.query.priceMax;
      } else {
        filters.product_price = {};
        filters.product_price.$lte = req.query.priceMax; 
      }
    }
    
    const value = {};
    if (req.query.sort === "price-desc") {
      value.product_price = "desc";
    } else if (req.query.sort === "price-asc") {
      value.product_price = "asc";
    }
    
    const page = req.query.page;
    const offers = await Offer.find(filters)
    .populate({
      path: "owner",
      select: "account",
    })
    .sort(value)
    .limit(limit)
    .skip((page - 1) * limit)
    // .select("product_name product_price -_id");
    
    
    const count = await Offer.find(filters).countDocuments();
    res.status(200).json({ count: count, offers: offers });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/offer/:id", async (req, res) => {
  try {
    const offerFound = await Offer.findById(req.params.id).populate({
      path: "owner",
      select: "account",
    });
    
    res.status(200).json(offerFound);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;