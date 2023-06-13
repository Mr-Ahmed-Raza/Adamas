import './App.css';
import Contact from './pages/Contact';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login'; 
import Home from './pages/Home';
import Userlist from './components/Userlist';
import AddCategory from './components/AddCategory';
import { Routes,Route } from "react-router-dom";
import ProductDetails from './pages/ProductDetails';
import Catagorey from './pages/Catagorey';
import Category from "./components/Category"
import Product from './components/Product';
import AddProduct from './components/AddProduct';
import AllCategories from './pages/AllCategories';
// User name changed
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/categories" element={<Catagorey/>} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/user-list" element={<Userlist />} />
        <Route path="/category-list" element={<Category />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/product-list" element={<Product/>} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/all-categories" element={<AllCategories />} />







    </Routes>
    </div>
  );
}

export default App;
