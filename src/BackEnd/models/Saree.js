const mongoose = require('mongoose');

const sareeSchema = new mongoose.Schema({
  price: Number,
  fabric: String,
  color: String,
  occasion: String,
  origin: String,
  stock: Number,
  images: [String],
  craft: String,
  name: String
});

module.exports = mongoose.model('Saree', sareeSchema);
