const express = require("express");
const Inspection = require("../models/Inspection");
const Lease = require("../models/Lease");
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
router.post("/move-in", authMiddleware, async (req, res) => {

    try {

        if (req.user.role !== "landlord") {
            return res.status(403).json({
                message: "Only landlords can perform move-in inspection"
            });
        }

        const { leaseId, rooms } = req.body;

        const lease = await Lease.findById(leaseId);

        if (!lease) {
            return res.status(404).json({
                message: "Lease not found"
            });
        }

        if (lease.landlord.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized for this lease"
            });
        }

        if (lease.state !== "ACTIVE") {
            return res.status(400).json({
                message: "Move-in inspection allowed only when lease is ACTIVE"
            });
        }

        const existingInspection = await Inspection.findOne({
            lease: leaseId,
            type: "MOVE_IN"
        });

        if (existingInspection) {
            return res.status(400).json({
                message: "Move-in inspection already exists"
            });
        }

        const inspection = new Inspection({
            lease: leaseId,
            type: "MOVE_IN",
            rooms
        });

        await inspection.save();

        res.status(201).json({
            message: "Move-in inspection recorded",
            inspection
        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

});

module.exports = router;