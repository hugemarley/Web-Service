const express = require("express");
const Mercury = require("@postlight/mercury-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/parser", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing URL query param" });
  }

  try {
    const result = await Mercury.parse(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: "Failed to parse article",
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`✅ Mercury Parser API running on port ${port}`);
});
