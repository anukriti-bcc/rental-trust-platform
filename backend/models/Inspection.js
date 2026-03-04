const mongoose = require("mongoose");

const surfaceSchema = new mongoose.Schema({
    surface: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    notes: {
        type: String
    }
});

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    surfaces: [surfaceSchema]
});

const inspectionSchema = new mongoose.Schema({

    lease: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lease",
        required: true
    },

    type: {
        type: String,
        enum: ["MOVE_IN", "MOVE_OUT"],
        required: true
    },

    rooms: [roomSchema],

    hash: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model("Inspection", inspectionSchema);