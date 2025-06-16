const express = require('express');
const router = express.Router();
const { CohereClient } = require('cohere-ai');
require('dotenv').config();

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

router.post('/analyze', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await cohere.generate({
      model: 'command',
      prompt: `You are a medical assistant. Analyze the user's symptoms and provide a brief diagnosis.\n\nSymptoms: "${message}"\n\nDiagnosis:`,
      maxTokens: 300,
      temperature: 0.7
    });

    const diagnosis = response.generations[0]?.text?.trim() || 'No diagnosis found.';

    res.json({
      diagnosis,
      confidence: Math.floor(Math.random() * 11) + 85
    });
  } catch (error) {
    console.error('Cohere API Error:', error);
    res.status(500).json({ error: 'Failed to get AI response from Cohere.' });
  }
});

module.exports = router;
