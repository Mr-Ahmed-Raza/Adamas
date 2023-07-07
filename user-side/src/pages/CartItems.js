import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import "./cartitem.css";
import "./checkout.css";
import toast, { Toaster } from "react-hot-toast";

function CartItems() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCartItem, setselectedCartItem] = useState([]);
  const loggedInUserId = JSON.parse(localStorage.getItem("userData"))._id;

  useEffect(() => {
    // Fetch the cart items when the component mounts
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    axios
      .get(`http://localhost:5001/api/cart/cartItemsByUser/${loggedInUserId}`)
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
      .delete(`http://localhost:5001/api/cart/removeCartItem/${itemId}`)
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

  const getselectedCartItem = (item) => {
    if (
      selectedCartItem.some(
        (selectedItem) => selectedItem.productId === item.productId
      )
    ) {
      setselectedCartItem((prevItems) =>
        prevItems.filter(
          (selectedItem) => selectedItem.productId !== item.productId
        )
      );
    } else {
      setselectedCartItem((prevItems) => [...prevItems, item]);
    }
  };
  return (
    <>
      <Toaster />
      <wrapper>
        <NavBar />
        <h1>Cart-Items </h1>
        {cartItems.map((item) => (
          <div class="cart-item" key={item.productId}>
            <input
              type="checkbox"
              className="cart-checkbox"
              onClick={() => getselectedCartItem(item)}
            />
            <img
              className="category-image"
              src={`http://localhost:5001/img/${item.productPicture}`}
            />
            <p class="product-name">{item.productName}</p>
            <p class="product-name">Price: ${item.productPrice}</p>
            <p class="product-name">
              Total Price: ${item.productPrice * item.quantity}
            </p>
            <p class="quantity colorchange">quantity:{item.quantity}</p>
            <a href="" onClick={() => removeCartItem(item._id)}>
              Remove From Cart
            </a>
          </div>
        ))}
        <div class="form-container">
        <h3>Order Summary</h3>
          {Array.isArray(selectedCartItem)
            ? selectedCartItem.map((item, index) => (
                <div class="form-group" key={item._id}>
                  <p className="bold">
                    {index + 1}: &nbsp;
                    <span className="unbold colorchange">
                      {item.productName}
                    </span>
                </p>
                <p class="quantity colorchange">quantity:{item.quantity}</p>
                  <p className="bold">
                    Price: &nbsp;
                    <span className="unbold colorchange">
                      ${item.productPrice * item.quantity}
                    </span>
                  </p>
                </div>
              ))
            : ""}
          <p className="bold">
            Total Payment:&nbsp; $
            {Array.isArray(selectedCartItem)
              ? selectedCartItem.reduce(
                  (total, item) => total + item.productPrice * item.quantity,
                  0
                )
              : 0}
          </p>
        </div>
        <br></br>

        <button>Proceed To Checkout</button>
        <br></br>
        <br></br>

        <Footer />
      </wrapper>
    </>
  );
}

export default CartItems;
