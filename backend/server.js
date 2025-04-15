require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 2000;

// Middleware
app.use(cors({
  origin: '*', // In production, you might want to restrict this to your frontend domain
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// API endpoint to chat with Gemini
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Create a chat session if history is provided
    let response;
    if (history && Array.isArray(history) && history.length > 0) {
      const chat = model.startChat({
        history: history.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.content }]
        }))
      });
      const result = await chat.sendMessage(message);
      response = result.response.text();
    } else {
      // Generate a response without history
      const result = await model.generateContent(message);
      response = result.response.text();
    }
    
    res.json({ response });
  } catch (error) {
    console.error('Error communicating with Gemini API:', error);
    res.status(500).json({ 
      error: 'Failed to communicate with Gemini API',
      details: error.message 
    });
  }
});

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
