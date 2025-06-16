const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');

// Load .env before anything else
dotenv.config();

const app = express(); // ✅ Moved this ABOVE all uses of 'app'
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes); // ✅ Now this is AFTER app is defined

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
