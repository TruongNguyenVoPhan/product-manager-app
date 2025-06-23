const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(require('cors')());

let products = [
  { id: 1, name: 'Laptop', price: 100 },
    { id: 2, name: 'Phone', price: 200 },
    { id: 3, name: 'TV', price: 300 }
];  

// Get all products     
app.get('/products', (req, res) => {
  res.json(products);
});     

//Post a new product
app.post('/products', (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1; // Simple ID generation
  products.push(newProduct);
  res.status(201).json(newProduct);
});

//Put to update a product
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
    const index = products.findIndex(p => p.id === productId);
    
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
    });

// Delete a product
app.delete('/products/:id', (req, res) => { 
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId);
    
    if (index !== -1) {
        const deletedProduct = products.splice(index, 1);
        res.json(deletedProduct[0]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});