import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import "./cartitem.css";
import toast, { Toaster } from 'react-hot-toast';


function CartItems() {
  const [cartItems, setCartItems] = useState([]);
  const loggedInUserId = JSON.parse(localStorage.getItem("userData"))._id;

  useEffect(() => {
    // Fetch the cart items when the component mounts
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    axios
      .get(`http://localhost:5001/api/cart/${loggedInUserId}`)
      .then((response) => {
        setCartItems(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const removeCartItem = (itemId) => {
    axios
      .delete(`http://localhost:5001/api/cart/${itemId}`)
      .then((response) => {
        // console.log(response.data.message);
        setTimeout(() => {
          toast.success("product remove from cart Successfully");
        }, 1000);
        fetchCartItems(); // Refresh cart items after deletion
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
       <Toaster/>
      <wrapper>
        <NavBar />
        <h1>Cart-Items </h1>
        {cartItems.map((item) => (
          <div class="cart-item" key={item.productId}>
          <input type="checkbox" className="cart-checkbox" />
            <img
              className="category-image"
              src={`http://localhost:5001/img/${item.productPicture}`}
            />
            <p class="product-name">{item.productName}</p>
            <p class="product-name">Price: ${item.productPrice}</p>
            <p class="product-name">
              Total Price: ${item.productPrice * item.quantity}
            </p>
            <p class="quantity">quantity:{item.quantity}</p>
            <button onClick={() => removeCartItem(item._id)}>
              Remove From Cart
            </button>
          </div>
          
        ))}

        <button>Proceed To Checkout</button>
        <br></br>
        <br></br>


        <Footer />
      </wrapper>
    </>
  );
}

export default CartItems;
