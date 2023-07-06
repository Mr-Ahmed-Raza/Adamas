import './App.css';
import Contact from './pages/Contact';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login'; 
import Home from './pages/Home';
import Userlist from './components/Userlist';
import AddCategory from './components/AddCategory';
import { Routes,Route } from "react-router-dom";
import ProductDetails from './pages/ProductDetails';
import CatagoreyDetail from './pages/CatagoreyDetail';
import Category from "./components/Category"
import Product from './components/Product';
import AddProduct from './components/AddProduct';
import AllCategories from './pages/AllCategories';
import AllProducts from './pages/AllProducts'
import VisitStore from "./pages/VisitStore"
import CartItems from "./pages/CartItems"
import Checkout from './pages/Checkout';
// User name changed
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/store" element={<VisitStore/>} />
        <Route path="/store/categories/:categoryId" element={<CatagoreyDetail/>} />
        <Route path="/product-details/:productId" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/user-list" element={<Userlist />} />
        <Route path="/category-list" element={<Category />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/product-list" element={<Product/>} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/cart-items" element={<CartItems />} />
        <Route path="/checkout" element={<Checkout/>} />










    </Routes>
    </div>
  );
}

export default App;
