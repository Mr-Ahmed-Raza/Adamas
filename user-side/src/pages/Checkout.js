import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import "./checkout.css";

function Checkout() {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});


  // Retrieve the order summary data from local storage
  const orderSummaryDataString = localStorage.getItem('orderSummaryData');
 // Parse the JSON string back into an object
const orderSummaryData = JSON.parse(orderSummaryDataString);
// Access the individual properties of the order summary data object
const selectedCartItem = orderSummaryData.selectedCartItem;
  const totalPayment = orderSummaryData.totalPayment;
  
  const validateCardNumber = (cardNumber) => {
    // Validate card number using a regular expression
    const regex = /^[0-9]{16}$/;
    return regex.test(cardNumber);
  };

  const validateCvv = (cvv) => {
    // Validate CVV using a regular expression
    const regex = /^[0-9]{3,4}$/;
    return regex.test(cvv);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setErrors({});

    // Validate card number and CVV
    const cardNumberValid = validateCardNumber(cardNumber);
    const cvvValid = validateCvv(cvv);

    if (!cardNumberValid) {
      setErrors({ ...errors, cardNumber: "Invalid card number" });
      return;
    }

    if (!cvvValid) {
      setErrors({ ...errors, cvv: "Invalid CVV" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/payment/create-payments", {
        totalPayment,
        name,
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
      });

      if (response.data.success) {
        setMessage("Payment successful");
      } else {
        setMessage("Payment failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred");
    }
  };
  return (
    <>
      <wrapper>
        <NavBar />
        <br></br>
        <div className="parent-container">

        <div class="summary-container">
        {Array.isArray(selectedCartItem) && selectedCartItem.length > 0 ? (
          <div className="form-container">
            <h3>Order Summary</h3>
            {selectedCartItem.map((item, index) => (
              <div className="form-group" key={item._id}>
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
                <p className="quantity colorchange">quantity: {item.quantity}</p>
                <p className="bold">
                  Total Price: &nbsp;
                  <span className="unbold colorchange">
                    ${item.productPrice * item.quantity}
                  </span>
                </p>
              </div>
            ))}
            
          </div>
            ) : null}
            <br></br>
            <p className="bold">
              Total To Pay: ${totalPayment}
            </p>
        </div>
        
        <div class="form-container">

            <h2>Checkout Payments</h2> 
            <div className="summary-container1">

           
          <form>
            <div class="form-group">
              <label for="name">Enter Full Name:</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div class="form-group">
              <label for="address">Enter Card Number:</label>
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div>{errors.cardNumber && <p>{errors.cardNumber}</p>}</div>
            <div class="form-group">
              <label for="contact">Enter Expiry Month:</label>
              <input
                type="text"
                placeholder="Expiry Month"
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
                required
              />
            </div>
            <div class="form-group">
              <label for="contact">Enter Expiry Year:</label>
              <input
                type="text"
                placeholder="Expiry Year"
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
                required
              />
            </div>
            <div class="form-group">
              <label for="contact">Enter CVV:</label>
              <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
            <div>{errors.cvv && <p>{errors.cvv}</p>}</div>
            <div class="form-group">
              <button type="submit">Pay with Paypro</button>
            </div>

            <div class="form-group">
              <button type="submit">Pay with EasyPaissa</button>
            </div>
              </form>
              </div>
          </div>
          

          </div>

        <br />

        <br />
        <Footer />
      </wrapper>
    </>
  );
}

export default Checkout;
