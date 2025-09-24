const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/auth");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose
  .connect(
    "mongodb+srv://johnluiealmodovar6_db_user:e3dA4dnMPcdFdBtl@cluster0.knc4i3v.mongodb.net/"
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Connection Error:", err));

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
