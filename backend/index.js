const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes');
const authMiddleware = require('./authMiddleware');
const productRoutes = require('./Routes/productRoutes');2
const categoryRoutes = require('./Routes/categoryRoutes');
require('./db');

const Category = require('./Models/categoryModel');

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/products', authMiddleware, productRoutes);


app.use('/categories', authMiddleware, categoryRoutes);

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
