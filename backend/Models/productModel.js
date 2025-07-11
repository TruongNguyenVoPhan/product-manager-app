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
  },
  //Phân biệt khi có người đang sửa sản phẩm **
  editLock: {
    isLocked: { type: Boolean, default: false },
    lockedBy: { type: String, default: '' },
    lockedAt: { type: Date , default: null }
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
