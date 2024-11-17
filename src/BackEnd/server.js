const express = require('express');
const mongoose = require('mongoose');
const Inventory = require('./models/Inventory');
const jewellery = require('./models/jewellery');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Routes
app.get('/api/inventory', async (req, res) => {
  try {
    const sarees = await Inventory.find();
    res.json(sarees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/Jewellry', async (req, res) => {
  try {
    const jewel = await jewellery.find();
    res.json(jewel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
