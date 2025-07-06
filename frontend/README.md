#  Product Manager Web App

A full-stack web application for managing products with authentication, dashboard, search, pagination, and user profile editing.

##  Tech Stack

**Frontend**: React, Bootstrap, React Router, Axios, React Toastify  
**Backend**: Node.js, Express.js, MongoDB, JWT

>  Live Demo: [Frontend on Vercel](hhttps://product-manager-app-wine.vercel.app/)  
>  Backend API: [Render Deployment](https://product-api-7ric.onrender.com)

##  Features

-  **User Authentication** (Register/Login using JWT)
-  **Edit Profile** (username, email, password)
-  **Product CRUD**
  - Create, Read, Update, Delete products
-  **Search** products by name
-  **Pagination** with navigation buttons
-  **Responsive UI** for desktop & mobile
-  **Loading spinner** while fetching data
-  Protected routes via token

##  Project Structure
├── backend/ # Express server with auth & product routes
├── frontend/
│ ├── src/
│ │ ├── components/ # Reusable components like ProductCard, Spinner
│ │ ├── pages/ # Main pages: Login, Register, Dashboard, Profile
│ │ ├── styles/ # CSS files
│ │ └── App.js # Routing & auth logic


##  Installation

### Backend

```bash
cd backend
npm install
npm start
# Runs on http://localhost:3000

```
### Frontend
cd frontend
npm install
npm start
# Runs on http://localhost:3001
Make sure MongoDB is running locally or use MongoDB Atlas.



---

### Author
GitHub:TruongNguyenVoPhan