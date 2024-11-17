const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  number: { type: String, required: true },
  address: { type: String, required: true },
  cart: { type: Array, default: [] },
  pastOrders: { type: Array, default: [] }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema, 'user');