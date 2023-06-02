import './App.css';
import Contact from './pages/Contact';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login'; 
import Home from './pages/Home';
import Userlist from './components/Userlist';
import AddCategory from './components/AddCategory';
import { Routes,Route } from "react-router-dom";
import ProductDetails from './pages/Product_details';
import Catagorey from './pages/Catagorey';
import Category from "./components/Category"

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
        <Route path="/add-category" element={<AddCategory/>} />






    </Routes>
    </div>
  );
}

export default App;
