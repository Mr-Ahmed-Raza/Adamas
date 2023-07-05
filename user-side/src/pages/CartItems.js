import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import "./cartitem.css";

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
  return (
    <>
      <wrapper>
        <NavBar />

        <h1>Cart-Items </h1>
        {cartItems.map((item) => (
          <div class="cart-item" key={item._id}>
            <img
              className="category-image"
              // src={`assets/images/slider-content-img.jpg`}
              // src={`/public/images/${category.picture}`}
              src={`http://localhost:5001/img/${item.productPicture}`}
              
            />
            <p class="product-name">{item.productName}</p>
            <p class="product-name">Price: ${item.productPrice}</p>
            <p class="product-name">
              Total Price: ${item.productPrice * item.quantity}
            </p>

            <p class="quantity">quantity:{item.quantity}</p>
            <button>BuyNow</button>
          </div>
        ))}

        <Footer />
      </wrapper>
    </>
  );
}

export default CartItems;
