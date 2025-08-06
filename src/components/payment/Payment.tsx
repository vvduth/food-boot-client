import React from "react";
import type { OrderDetailsForPayment } from "../../types/order";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import ApiService from "../../services/ApiService";
import { useError } from "../common/ErrorDisplay";

const stripeInstance = loadStripe(
  "pk_test_51KPOjRCpGAJrQNJzKUGOtQxEmXbFQfrx7iLV0O1awlJoODJpqYSP7Qznx5Zr5gDLw1FrBpUyf2XomBrA9lO6bT8H00EvT3Go2x"
);

const PaymentForm = ({ amount, orderId, onSuccess }: {
    amount: OrderDetailsForPayment["amount"];
  orderId: OrderDetailsForPayment["orderId"];
    onSuccess: (paymentIntent: any) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { ErrorDisplay, showError } = useError();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    try {
        
    } catch (error:any) {
        console.log("Payment error:", error);
        showError(error.message)
    } finally {
        setLoading(false);
    }
  }

  return (
    <></>
  )
};

const Payment = ({
  amount,
  orderId,
  onSuccess,
}: {
  amount: OrderDetailsForPayment["amount"];
  orderId: OrderDetailsForPayment["orderId"];
  onSuccess: (paymentIntent: any) => void;
}) => {
  console.log(
    "Payment component rendered with amount:",
    amount,
    "and orderId:",
    orderId
  );
  return (
    <div className="payment-container">
      <h2>Complete Payment</h2>
      <Elements stripe={stripeInstance}>
        <PaymentForm amount={amount} orderId={orderId} onSuccess={onSuccess} />
      </Elements>
    </div>
  );
};

export default Payment;
