import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./cartitem.css";
import "./checkout.css";
import FullPageLoader from "../components/FullPageLoader";
import toast, { Toaster } from "react-hot-toast";

function CartItems() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCartItem, setselectedCartItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const loggedInUserId = JSON.parse(localStorage.getItem("userData"))._id;
  const loggedInUserName = JSON.parse(
    localStorage.getItem("userData")
  ).firstName;
  const loggedInUserEmail = JSON.parse(localStorage.getItem("userData")).email;
  const navigate = useNavigate();

  const totalPayment = selectedCartItem
    ? selectedCartItem.reduce(
        (total, item) => total + item.productPrice * item.quantity,
        0
      )
    : 0;

  console.log("email: ", loggedInUserEmail);
  console.log("Name: ", loggedInUserName);

  const handleSelectAll = () => {
    setLoading(true); // Show loader when "Select All" checkbox is clicked
    setTimeout(() => {
      if (selectAll) {
        setselectedCartItem([]);
      } else {
        setselectedCartItem([...cartItems]);
      }
      setSelectAll((prev) => !prev);
      setLoading(false); // Hide loader after a brief delay
    }, 1000); // Simulating a 1-second delay before updating checkbox state
  };

  const handleProceedToCheckout = () => {
    // Store the order summary data in an object
    const orderSummaryData = {
      selectedCartItem,
      totalPayment,
    };
    // Convert the order summary object to a JSON string
    const orderSummaryDataString = JSON.stringify(orderSummaryData);
    // Store the order summary data in local storage
    localStorage.setItem("orderSummaryData", orderSummaryDataString);
    setLoading(true); // Show loader
    setTimeout(() => {
      setLoading(false); // Hide loader
      navigate("/checkout");
    }, 1000); // Simulating a delay of 2 seconds before redirecting
  };

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
      .then(() => {
        // console.log(response.data.message);
        toast.success("product remove from cart Successfully");
        fetchCartItems(); // Refresh cart items after deletion
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCartItemCheckbox = (item) => {
    setLoading(true);
    setTimeout(() => {
      if (selectedCartItem.some((selectedItem) => selectedItem.productId === item.productId)) {
        setselectedCartItem((prevItems) =>
          prevItems.filter((selectedItem) => selectedItem.productId !== item.productId)
        );
      } else {
        setselectedCartItem((prevItems) => [...prevItems, item]);
      }
      setLoading(false); 
    }, 1000); 
  };

  return (
    <>
      <Toaster />
      {loading && <FullPageLoader />}
      <wrapper>
        <NavBar />
        <h1>Cart-Items </h1>
        {cartItems.length > 0 && ( // Check if there are any cart items
          <label>
            <input
              type="checkbox"
              className="cart-checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            Select All
          </label>
        )}
        {
          cartItems.length === 0 && 
          (
            <p>No products in cartitem yet</p>
          )
        }
        {cartItems.map((item) => (
          <div class="cart-item" key={item.productId}>
            
          <label>
            <input
              type="checkbox"
              className="cart-checkbox"
              checked={selectedCartItem.some((selectedItem) => selectedItem.productId === item.productId)}
              onChange={() => handleCartItemCheckbox(item)}
              />
              </label>
            <img
              className="category-image"
              src={`http://localhost:5001/img/${item.productPicture}`}
              alt=""
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
                  <p className="bold">
                    Price: &nbsp;
                    <span className="unbold colorchange">
                      ${item.productPrice}
                    </span>
                  </p>
                  <p className="quantity colorchange">
                    quantity: {item.quantity}
                  </p>
                  <p className="bold">
                    Total Price: &nbsp;
                    <span className="unbold colorchange">
                      ${item.productPrice * item.quantity}
                    </span>
                  </p>
                </div>
              ))
            : ""}
          <p className="bold">Total Payment:&nbsp; ${totalPayment}</p>
        </div>
        <br></br>

        <button onClick={() => handleProceedToCheckout()}>
          {" "}
          Proceed To Checkout
        </button>
        <br></br>
        <br></br>

        <Footer />
      </wrapper>
    </>
  );
}

export default CartItems;
