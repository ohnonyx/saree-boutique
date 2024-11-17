const mongoose = require('mongoose');

const JewellrySchema = new mongoose.Schema({
  price: Number,
  color: String,
  occasion: String,
  origin: String,
  stock: Number,
  images: [String],
  name: String,
  description: String,
  itemtype: String,
});

module.exports = mongoose.model('jewellery', JewellrySchema, 'Jewellry');