const AI_SERVER_URL = 'http://127.0.0.1:5001/process-image';

const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

let latestAnalysis = null; // ✅ Store the latest AI results

// ✅ Upload Rooftop Image & Process with AI
router.post('/upload-rooftop-image', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);

    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));

        // 🔹 Send file to AI Processing API
        const aiResponse = await axios.post(AI_SERVER_URL, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        latestAnalysis = aiResponse.data; // ✅ Store the latest AI analysis

        res.json({
            message: 'Image processed successfully',
            analysis: latestAnalysis,
            filePath: `/uploads/${req.file.filename}`
        });

    } catch (error) {
        console.error('AI Processing Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error processing image' });
    }
});

// ✅ Retrieve Latest AI Analysis
router.get('/get-latest-analysis', (req, res) => {
    if (!latestAnalysis) {
        return res.status(404).json({ message: "No analysis found" });
    }

    res.json(latestAnalysis);
});

module.exports = router;
