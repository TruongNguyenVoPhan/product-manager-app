
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, 
  required: true, 
  unique: true,
  //Phân biệt khi có người đang sửa danh muc **
  editLock: {
    isLocked: { type: Boolean, default: false },
    lockedBy: { type: String, default: '' },
    lockedAt: { type: Date , default: null }
  }
},
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category; 
