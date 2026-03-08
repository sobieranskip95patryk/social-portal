// routes/rooms.js
const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// lista pokoi
router.get("/rooms", async (req, res) => {
    const rooms = await Room.find().sort({ name: 1 });
    res.json(rooms);
});

// tworzenie pokoju (na początek bez auth)
router.post("/rooms", async (req, res) => {
    const { name, topic } = req.body;
    const room = new Room({ name, topic });
    await room.save();
    res.json(room);
});

module.exports = router;
