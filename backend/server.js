const express = require("express");
const shortid = require("shortid");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for React frontend
app.use(express.json()); // Parse JSON requests

const urlDatabase = {}; // In-memory database

// Endpoint to shorten a URL
app.post("/shorten", (req, res) => {
    const { longUrl } = req.body;
    const shortUrl = shortid.generate();
    urlDatabase[shortUrl] = longUrl;
    res.json({ shortUrl: `http://localhost:5000/${shortUrl}` });
});

// Endpoint to redirect a short URL to the original URL
app.get("/:shortUrl", (req, res) => {
    const shortUrl = req.params.shortUrl;
    const longUrl = urlDatabase[shortUrl];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).send("Short URL not found");
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
