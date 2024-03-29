const Payment = require("../models/PaymentModel");
const request =require('request')
const asyncHandler = require("express-async-handler");
const axios = require('axios');
// const PayPro = require('paypro-api');
// const merchantId = 'rkSkN9OT8FCHX1z';
// const apiKey = '4g00hgCBur6UFPj';
// Create a new paymentclient = PayPro::Client.new('YOUR_API_KEY')
const paypro = require('paypro-client');
require('dotenv').config();
const Customer = require('../models/CustomerModel');
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = require('stripe')(STRIPE_SECRET_KEY)

const createPayments = asyncHandler(async (req, res) => {
  try {
    // const { totalPayment, name, cardNumber, expiryMonth, expiryYear, cvv } = req.body;
    // console.log("Details" , totalPayment, name, cardNumber, expiryMonth, expiryYear, cvv);
    // const payment = new Payment({
    //   totalPayment,
    //   name,
    //   cardNumber,
    //   expiryMonth,
    //   expiryYear,
    //   cvv,
    // });
    // await payment.save();
    // Make an API request to PayPro to process the payment

    const paypro = new PayPro('rkSkN9OT8FCHX1z', '4g00hgCBur6UFPj');
    const paymentData = {
      amount: 1000,
      description: 'My Payment Description',
      return_url: 'https://www.google.com/'
    };
    // paypro.createPayment(paymentData)
    // .then(payment => 
    //     console.log(payment)
    // )
    // .catch(error => 
    //     console.error(error));
    
    // paypro.post('/v1/payments/payment', paymentData)
    // .then(payment => {
    //     console.log(payment);
    // })
    // .catch(error => {
    //     console.error(error);
    // });

    // const response = await axios.post('https://demoapi.paypro.com.pk/v2/ppro/auth', {
    //   totalPayment,
    //   name,
    //   cardNumber,
    //   expiryMonth,
    //   expiryYear,
    //   cvv,
    //   clientid : "EE5oO9LQxplKV7h",
    //   clientsecret : "JEbAyiGObntCJgy"
  
    //   // Additional parameters required by PayPro API
    // });
    
    // Handle the response from PayPro
    // if (response.data.success) {
    //   // Payment successful
    //   res.json({ success: true, message: 'Payment successful' });
    // } else {
    //   // Payment failed
    //   res.status(400).json({ success: false, message: 'Payment failed' });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});
  
const requestPayments = asyncHandler(async (req, res) => {
  try {
    // const response = await axios.post(
    //   'https://api.paypro.pk/v1/payments/initiate',
    //   {
    //     merchantId: merchantId,
    //     apiKey: apiKey,
    //     amount: 1000, // Amount in Pakistani Rupees
    //     description: 'Payment for a product',
    //     returnUrl: 'https://www.google.com/', // URL to redirect after payment completion
    //   }
    // );
    const paymentParams = {
      amount: 100, // Amount in the smallest unit of the currency (e.g., cents)
      currency: 'USD', // Currency code (e.g., USD)
      recipient: 'your_recipient_address', // Recipient's wallet address or identifier
      description: 'Payment for goods', // Optional payment description
    };
    const paymentCode = paypro.getPaymentCode(paymentParams);

    console.log('Payment Code:', paymentCode);


    // Handle the response from PayPro.pk
    console.log(response.data);
    res.json({ success: true, message: 'Payment successful', data: response.data });
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    res.status(500).json({ success: false, message: error });
  }
});


const createCustomer = async(req,res)=>{

  try {

      const customer = await stripe.customers.create({
          name:req.body.name,
          email:req.body.email,
      });
      const newCustomer = new Customer({
        name: req.body.name,
        email: req.body.email
      });
      await newCustomer.save();
      res.status(200).send(customer);

  } catch (error) {
      res.status(400).send({success:false,msg:error.message});
  }

}

const addNewCard = async (req, res) => {
  try {
    const {
      customer_id,
      card_Name,
      card_ExpYear,
      card_ExpMonth,
      card_Number,
      card_CVC,
    } = req.body;
    console.log("REQ.BODY: ", req.body)
    if (!customer_id || !card_Name || !card_ExpYear || !card_ExpMonth || !card_Number || !card_CVC) {
      // throw new Error('Missing required parameters');
      console.log("Missing required parameters");

    }

    const card_token = await stripe.tokens.create({
      card: {
        name: card_Name,
        number: card_Number,
        exp_year: card_ExpYear,
        exp_month: card_ExpMonth,

        cvc: card_CVC
      }
    });
console.log("card_token");
    const card = await stripe.customers.createSource(customer_id, {
      source: `${card_token.id}`
    });

    res.status(200).send({ card: card.id });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}


const createCharges = async(req,res)=>{

  try {

      const createCharge = await stripe.charges.create({
          receipt_email: 'tester@gmail.com',
          amount: parseInt(req.body.amount)*100, //amount*100
          currency:'PKR',
          card: req.body.card_id,
          customer: req.body.customer_id
      });

      res.status(200).send(createCharge);

  } catch (error) {
      res.status(400).send({success:false,msg:error.message});
  }

}

const getPaymentauth = async (req, res) => {

const options = {
  method: 'GET',
  url: 'https://api.eu-de.apiconnect.appdomain.cloud/easypaisaapigw-telenorbankpk-tmbdev/dev-catalog/gateway-login/gen',
  headers: {
    'X-IBM-Client-Id': '6dc6f9b2-08ec-4e23-a329-f20818324cd6',
    'X-IBM-Client-Secret': 'uN7kQ1jF6gM7vM3gI3cP6pA8jY4hD7sD3mW0mT0aP2sX1oP6iS',
    'iss-claim': 'https://myidp.ibm.com',
    'aud-claim': 'ClientID1',
    accept: 'application/json'
  }
};

request(options, function (error, res, body) {
  if (error) throw new Error(error);

  console.log(body);
});
}
const verifytoken = async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://api.eu-de.apiconnect.appdomain.cloud/easypaisaapigw-telenorbankpk-tmbdev/dev-catalog/gateway-login/verify',
    headers: {
      'X-IBM-Client-Id': '6dc6f9b2-08ec-4e23-a329-f20818324cd6',
      'X-IBM-Client-Secret': 'uN7kQ1jF6gM7vM3gI3cP6pA8jY4hD7sD3mW0mT0aP2sX1oP6iS',
      Authorization: 'eyJraWQiOiJoczI1Ni1rZXkiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL215aWRwLmlibS5jb20iLCJhdWQiOiJDbGllbnRJRDEiLCJleHAiOjE2ODk5MzM0NDYsImlhdCI6MTY4OTkzMzE0Nn0.YeXujjVixtB_yBXt-9b3ukFeC5_F3GOCw0YG7bOhIlQ',
      accept: 'application/json'
    }
  };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
}
const aquireUserInfo = async (req, res) => {
  const request = require('request');

const options = {
  method: 'POST',
  url: 'https://api.eu-de.apiconnect.appdomain.cloud/easypaisaapigw-telenorbankpk-tmbdev/dev-catalog/inquireuserinfo/InquireUserInfov1',
  headers: {
    'X-IBM-Client-Id': '6dc6f9b2-08ec-4e23-a329-f20818324cd6',
    'X-IBM-Client-Secret': 'uN7kQ1jF6gM7vM3gI3cP6pA8jY4hD7sD3mW0mT0aP2sX1oP6iS',
    'Access-Token': 'eyJraWQiOiJoczI1Ni1rZXkiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL215aWRwLmlibS5jb20iLCJhdWQiOiJDbGllbnRJRDEiLCJleHAiOjE2ODk2MDIyMzksImlhdCI6MTY4OTYwMTkzOX0.RzySCR-eX3MWePvPwOVNrYCfgUFYssg6S3cHPq8uKwc',
    Authorization: 'eyJraWQiOiJoczI1Ni1rZXkiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL215aWRwLmlibS5jb20iLCJhdWQiOiJDbGllbnRJRDEiLCJleHAiOjE2ODk2MDIyMzksImlhdCI6MTY4OTYwMTkzOX0.RzySCR-eX3MWePvPwOVNrYCfgUFYssg6S3cHPq8uKwc',
    'content-type': 'application/json',
    accept: 'application/json'
  },
  body: {authCode: 'kohimpigig'},
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
}

module.exports = {createPayments , requestPayments , createCustomer, addNewCard , createCharges , getPaymentauth , verifytoken , aquireUserInfo }