const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
  description: String,
  quantity: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' 
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
