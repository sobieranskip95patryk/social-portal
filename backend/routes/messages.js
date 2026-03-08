// routes/messages.js
const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "super_tajny_klucz";

function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "Brak tokenu" });
    const token = header.split(" ")[1];
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ error: "Nieprawidłowy token" });
    }
}

// pobierz wiadomości z pokoju
router.get("/rooms/:id/messages", async (req, res) => {
    const msgs = await Message.find({ room: req.params.id })
        .populate("author", "username")
        .sort({ createdAt: 1 })
        .limit(100);
    res.json(msgs);
});

// wyślij wiadomość
router.post("/rooms/:id/messages", auth, async (req, res) => {
    const msg = new Message({
        room: req.params.id,
        author: req.user.id,
        content: req.body.content
    });
    await msg.save();
    res.json(msg);
});

module.exports = router;
