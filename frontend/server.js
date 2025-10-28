import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, "dist")));

// Handle all routes by serving index.html (for React Router)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Use Railway's PORT or fallback to 5173
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`✅ Frontend running on port ${PORT}`);
});
