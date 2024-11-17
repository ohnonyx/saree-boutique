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

app.get('/api/Jewellry', async (req, res) => {
  try {
    const jewel = await jewellery.find();
    res.json(jewel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add item to the cart
app.post('/api/user/cart', async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body; // Get userId, itemId, and quantity from request body

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the item to be added (e.g., jewelry or saree)
    const item = await jewellery.findById(itemId); // Assuming `itemId` corresponds to the item in your 'jewellery' collection
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if item already exists in cart
    const existingItemIndex = user.cart.findIndex(cartItem => cartItem.itemId.toString() === itemId.toString());
    if (existingItemIndex !== -1) {
      // Update the quantity of the existing item in the cart
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to the cart
      user.cart.push({
        itemId: item._id,
        name: item.name,
        price: item.price,
        quantity: quantity,
        imageUrl: item.images[0] // Use the first image for display
      });
    }

    // Save the updated user document with the new cart
    await user.save();

    res.status(200).json({ message: 'Item added to cart successfully', cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to fetch user's cart
app.get('/api/user/cart', async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from query params

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch the items in the user's cart
    const cartItems = await Promise.all(
      user.cart.map(async (cartItem) => {
        const item = await jewellery.findById(cartItem.itemId);
        return {
          ...cartItem,
          item: item // Adding item details to the cart item
        };
      })
    );

    res.status(200).json({ cartItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to handle user registration
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
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id }); // Send userId back in response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to handle user login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ success: true, userId: user._id, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
