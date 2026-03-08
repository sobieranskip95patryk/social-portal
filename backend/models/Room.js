// models/Room.js
const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    topic: { type: String, default: "" },
    isPrivate: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Room", RoomSchema);
