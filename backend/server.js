require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { generateGiftRecommendation } = require("./services/geminiService");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Gift Guru Backend is Running 🚀");
});

app.post("/api/recommend", async (req, res) => {
  const userData = req.body;

  if (!userData) {
    return res.status(400).json({
      success: false,
      message: "No user data provided",
    });
  }

  const recommendations = await generateGiftRecommendation(userData);

  res.json({
    success: true,
    recommendations,
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
