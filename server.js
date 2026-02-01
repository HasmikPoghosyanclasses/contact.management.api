require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Contacts Management API is running" });
});

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
