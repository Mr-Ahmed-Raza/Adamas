import './App.css';
import Contact from './pages/Contact';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login'; 
import Home from './pages/Home';
import Userlist from './components/Userlist';
import { Routes,Route } from "react-router-dom";
import Product_details from './pages/Product_details';
import Catagorey from './pages/Catagorey';

// User name changed
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/categories" element={<Catagorey/>} />
        <Route path="/product-details" element={<Product_details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/user-list" element={<Userlist/>} />




    </Routes>
    </div>
  );
}

export default App;
