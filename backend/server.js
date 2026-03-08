const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Połączenie z MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/socialmini")
    .then(() => console.log("Połączono z MongoDB"))
    .catch(err => console.error("Błąd połączenia:", err));

// ROUTES
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const roomRoutes = require("./routes/rooms");
app.use("/api", roomRoutes);

const messageRoutes = require("./routes/messages");
app.use("/api", messageRoutes);

// Start serwera
app.listen(5000, () => {
    console.log("Serwer działa na http://localhost:5000");
});
