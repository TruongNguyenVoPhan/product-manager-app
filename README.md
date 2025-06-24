# Product Manager App

A fullstack web application for managing products, built with Node.js (Express) for the backend and ReactJS for the frontend.  
It uses MongoDB Atlas for persistent data storage.

---

## Features

- View all products
- Add new product
- Update existing product
- Delete product
- RESTful API using Express
- ReactJS frontend using Axios
- CORS support
- MongoDB Atlas cloud database

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS

### Frontend
- ReactJS
- Axios
- JavaScript
- HTML/CSS (basic styling)

---

## Project Structure

project-manager/
├── backend/
│ ├── db.js
│ ├── index.js
│ └── productModel.js
├── frontend/
│ ├── public/
│ ├── src/
│ │ └── App.js
├── README.md
└── .gitignore



---

## How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/TruongNguyenVoPhan/product-manager-app.git
cd product-manager-app
### 2.Setup and run backend
cd backend
npm install
node index.js
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/product_manager');
### 3. Setup and run frontend
cd ../frontend
npm install
npm start
