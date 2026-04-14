import "dotenv/config";
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());
app.use(express.json());

// route test
app.get("/", (req, res) => {
  res.send("777TV backend running");
});

// route youtube
app.get("/api/youtube/playlist", async (req, res) => {
  try {
    const { playlistId } = req.query;
    const key = process.env.YOUTUBE_API_KEY;

    if (!playlistId || !key) {
      return res.status(400).json({ error: "Missing playlistId or API key" });
    }

    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=20&playlistId=${playlistId}&key=${key}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ⚠️ IMPORTANT PORT RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
