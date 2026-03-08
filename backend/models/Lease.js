const mongoose = require("mongoose");

const leaseSchema = new mongoose.Schema({

    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },

    landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    depositAmount: {
        type: Number,
        required: true
    },

    leaseStart: {
        type: Date
    },

    leaseEnd: {
        type: Date
    },

    state: {
        type: String,
        enum: [
            "CREATED",
            "ACTIVE",
            "NOTICE_GIVEN",
            "INSPECTION",
            "SETTLEMENT",
            "CLOSED"
        ],
        default: "CREATED"
    }

}, { timestamps: true });

module.exports = mongoose.model("Lease", leaseSchema);