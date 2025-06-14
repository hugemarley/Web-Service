const express = require("express");
const Mercury = require("@postlight/mercury-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/parser", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const result = await Mercury.parse(url);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to parse article", detail: err.message });
  }
});

app.listen(port, () => {
  console.log(`Mercury API running on port ${port}`);
});
