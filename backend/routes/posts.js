const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "super_tajny_klucz";

function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "Brak tokenu" });

    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Nieprawidłowy token" });
    }
}

router.get("/posts", async (req, res) => {
    const posts = await Post.find().populate("author", "username").sort({ createdAt: -1 });
    res.json(posts);
});

router.post("/posts", auth, async (req, res) => {
    const { content } = req.body;

    const post = new Post({
        author: req.user.id,
        content
    });

    await post.save();
    res.json({ message: "Post dodany" });
});

router.post("/posts/:id/like", auth, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post nie istnieje" });

    post.likes++;
    await post.save();

    res.json({ likes: post.likes });
});

module.exports = router;
