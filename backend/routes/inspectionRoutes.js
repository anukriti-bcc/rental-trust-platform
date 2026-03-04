const express = require("express");
const Inspection = require("../models/Inspection");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {

    try {

        const { lease, type, rooms } = req.body;

        const inspection = new Inspection({
            lease,
            type,
            rooms
        });

        await inspection.save();

        res.status(201).json({
            message: "Inspection created",
            inspection
        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

});

module.exports = router;