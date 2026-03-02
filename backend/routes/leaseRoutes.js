const express = require("express");
const Lease = require("../models/Lease");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {

    try {

        const { tenant, propertyAddress, depositAmount, leaseStart, leaseEnd } = req.body;

        const lease = new Lease({
            landlord: req.user.id,
            tenant,
            propertyAddress,
            depositAmount,
            leaseStart,
            leaseEnd
        });

        await lease.save();

        res.status(201).json({
            message: "Lease created",
            lease
        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

});

module.exports = router;