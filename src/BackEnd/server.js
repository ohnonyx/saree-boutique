const express = require('express');
const mongoose = require('mongoose');
const Inventory = require('./models/Inventory');
const jewellery = require('./models/jewellery');
const cors = require('cors');
const User = require('./models/User');
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



app.post('/api/user', async (req, res) => {
  try {
    const { name, email, password, number, address, cart, pastOrders } = req.body;

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already registered' });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password, // Hash the password in production
      number,
      address,
      cart: cart || [], // Default to empty array if not provided
      pastOrders: pastOrders || [] // Default to empty array if not provided
    }); 

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    // Check if the password matches (use hashed passwords in production)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during login' });
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

app.get('/api/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user and get their cart
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
});




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));