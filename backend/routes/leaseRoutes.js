const express = require("express");
const Lease = require("../models/Lease");
const Listing = require("../models/Listing");
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

router.post("/request", authMiddleware, async (req, res) => {

    try {

        if (req.user.role !== "tenant") {
            return res.status(403).json({
                message: "Only tenants can request leases"
            });
        }

        const { listingId, depositAmount } = req.body;

        const listing = await Listing.findById(listingId);

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found"
            });
        }

        const lease = new Lease({
            listing: listingId,
            tenant: req.user.id,
            landlord: listing.landlord,
            depositAmount,
            state: "CREATED"
        });

        await lease.save();

        res.status(201).json({
            message: "Lease request created",
            lease
        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

});

router.patch("/:id/approve", authMiddleware, async (req, res) => {

    try {

        if (req.user.role !== "landlord") {
            return res.status(403).json({
                message: "Only landlords can approve leases"
            });
        }

        const lease = await Lease.findById(req.params.id);

        if (!lease) {
            return res.status(404).json({
                message: "Lease not found"
            });
        }

        if (lease.landlord.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to approve this lease"
            });
        }

        if (lease.state !== "CREATED") {
            return res.status(400).json({
                message: "Lease cannot be approved in its current state"
            });
        }

        lease.state = "ACTIVE";

        await lease.save();

        res.json({
            message: "Lease approved",
            lease
        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

});

module.exports = router;