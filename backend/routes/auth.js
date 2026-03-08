const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Klucz do JWT (na produkcji trzymamy w .env)
const JWT_SECRET = "super_tajny_klucz";

router.post("/register", async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: "Email jest już zajęty" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashed,
            username
        });

        await user.save();

        res.json({ message: "Użytkownik zarejestrowany" });
    } catch (err) {
        res.status(500).json({ error: "Błąd serwera" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Nieprawidłowy email lub hasło" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: "Nieprawidłowy email lub hasło" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token, username: user.username });
    } catch (err) {
        res.status(500).json({ error: "Błąd serwera" });
    }
});

module.exports = router;
