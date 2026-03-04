const express = require("express");
const Listing = require("../models/Listing");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {

    try {

        if (req.user.role !== "landlord") {
            return res.status(403).json({
                message: "Only landlords can create listings"
            });
        }

        const { title, description, city, rent, bedrooms, bathrooms } = req.body;

        const listing = new Listing({
            landlord: req.user.id,
            title,
            description,
            city,
            rent,
            bedrooms,
            bathrooms
        });

        await listing.save();

        res.status(201).json({
            message: "Listing created",
            listing
        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

});

router.get("/", async (req, res) => {

    const listings = await Listing.find().populate("landlord", "name");

    res.json(listings);

});

router.get("/:id", async (req, res) => {

    const listing = await Listing.findById(req.params.id);

    res.json(listing);

});

module.exports = router;