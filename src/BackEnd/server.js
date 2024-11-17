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


app.get('/api/user', async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from query params
    const user = await User.findById(userId); // Fetch user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user); // Return user data
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching user data' });
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
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id }); // Send userId back in response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/user/cart', async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId); // Find user by ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Populate the cart items with product details from inventory/jewelry collection
    const cartItems = await Promise.all(user.cart.map(async (item) => {
      const product = await Inventory.findById(item[0]); // Assuming cart items are from the Inventory collection
      return {
        ...product.toObject(), // Convert Mongoose document to plain object
        quantity: item[1], // Add the quantity to the product data
      };
    }));

    res.status(200).json({ cart: cartItems }); // Return the populated cart items
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'An error occurred while fetching the cart.' });
  }
});


app.post('/api/user/cart', async (req, res) => {
  try {
    console.log('Incoming request body:', req.body);
    const { userId, itemId, quantity } = req.body;

    // Validate input
    if (!userId || !itemId || !quantity) {
      return res.status(400).json({ message: 'User ID, Item ID, and Quantity are required.' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than zero.' });
    }

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the item already exists in the cart
    const cartItem = user.cart.find(item => item.itemId.toString() === itemId);

    if (cartItem) {
      // Update quantity if the item exists
      cartItem.quantity += quantity;
    } else {
      // Add new item to the cart
      user.cart.push({ itemId, quantity });
    }

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Cart updated successfully', cart: user.cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'An error occurred while updating the cart.', error: error.message });
  }
});




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

app.get('/api/Jewellry', async (req, res) => {
  try {
    const jewel = await jewellery.find();
    res.json(jewel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/inventory/:id', async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific item from Jewellery
app.get('/api/jewellery/:id', async (req, res) => {
  try {
    const item = await jewellery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
