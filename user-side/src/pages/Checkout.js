import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "./checkout.css";

function Checkout() {
  return (
    <>
      <wrapper>
        <NavBar />
        <br></br>
        <h2>Checkout Payments </h2>
       
          <div class="form-container">
            <form>
              <div class="form-group">
                <label for="name">Full Name:</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div class="form-group">
                <label for="address">Mobile Number:</label>
                <input type="text" id="address" name="address" required />
              </div>
              <div class="form-group">
                <label for="contact">Contact Number:</label>
                <input type="text" id="contact" name="contact" required />
              </div>
              <div class="form-group">
                <button type="submit">Pay with EasyPaissa</button>
              </div>
            </form>
          </div>
          <br />
          
        
        <br />
        <Footer />
      </wrapper>
    </>
  );
}

export default Checkout;
