const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  number: { type: String, required: true },
  address: { type: String, required: true },
  cart: [
    {
      itemId: { type: Schema.Types.ObjectId, ref: 'Inventory', required: true },
      quantity: { type: Number, required: true },
    }
  ],
  pastOrders: { type: Array, default: [] }
});

module.exports = mongoose.model('User', userSchema, 'user');