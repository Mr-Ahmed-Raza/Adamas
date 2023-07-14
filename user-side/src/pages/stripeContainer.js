import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CartItems from "./CartItems";

const PUBLIC_KEY =
  "sk_test_51NTIbYG9sy2sHgEl1Y6CHB361TKh7nrEuxmE8Gis4NW3o21eNcfRBcSjgprBrv1bHNeL3wCtYnD3b8D0Zbna6nIj00bJacbilw";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <CartItems />
    </Elements>
  );
}
