// Import necessary modules
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Configure Multer with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "imgYoutube", // Set your desired folder name
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});

const upload = multer({ storage: storage });

// Define a route for file upload
app.post("/upload", upload.single("image"), (req, res) => {
  // Check if a file was uploaded successfully
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Cloudinary will provide public URLs for the uploaded file
  const imageUrl = req.file.path;

  // Respond with the public URL of the uploaded image
  res.status(200).json({ imageUrl });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
