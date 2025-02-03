import express from 'express';
import cloudinary from '../utils/cloudinary.js';
import multer from 'multer';

// Set up multer to save files to the 'uploads' directory
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Single image upload route
router.post('/upload', upload.single('image'), async (req, res) => {
  // Ensure the file is uploaded
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded.',
    });
  }

  try {
    // Upload the file to Cloudinary
    const image = await cloudinary.uploader.upload(req.file.path);

    if (!image) {
      return res.status(500).json({
        success: false,
        message: 'Error uploading image',
      });
    }

    // Return the Cloudinary URL
    res.status(200).json({
      success: true,
      message: 'Uploaded successfully!',
      data: image.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: error.message,
    });
  }
});

export default router;
