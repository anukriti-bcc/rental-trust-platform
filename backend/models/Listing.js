const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({

    landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: String,

    city: {
        type: String,
        required: true
    },

    rent: {
        type: Number,
        required: true
    },

    bedrooms: Number,

    bathrooms: Number,

    available: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Listing", listingSchema);