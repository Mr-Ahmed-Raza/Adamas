import './App.css';
import Contact from './pages/Contact';
import Home from './pages/Home';
import { Routes,Route } from "react-router-dom";
import Product_details from './pages/Product_details';
import Catagorey from './pages/Catagorey';

// User name changed
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/categories" element={<Catagorey/>} />
        <Route path="/product-details" element={<Product_details/>} />

    </Routes>
    </div>
  );
}

export default App;
