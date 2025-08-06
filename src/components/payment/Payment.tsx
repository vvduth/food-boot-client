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
import { PaymentStatus } from "../../types/payment";

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

        // step1: initialize payment intent i.e generate transaction id from backend
        const body: OrderDetailsForPayment = {
            orderId: orderId,
            amount: amount
        }
        const paymentInitializeResponse = await ApiService.proceedForPayment(body);

        if (paymentInitializeResponse.statusCode !== 200) {
            throw new Error(paymentInitializeResponse.message || "Failed to initiate payment");
        }

        const uniqueTransactionId = paymentInitializeResponse.data;

        // Step 2: Confirm the payment with Stripe
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
            uniqueTransactionId,
            {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                    billing_details: {
                        // add any addititonla billing details if needed
                    }
                },
            })
        if (stripeError) {
            throw stripeError;
        }
        if (paymentIntent.status === 'succeeded') {
            console.log('Payment successful:', paymentIntent);
            const res = await ApiService.updateOrderPayment({
                orderId: orderId,
                transactionId: paymentIntent.id,
                success: true,
                amount: amount
            })
            onSuccess(paymentIntent);
        } else {
            const res = await ApiService.updateOrderPayment({
                orderId: orderId,
                transactionId: paymentIntent.id,
                success: false,
                amount: amount
            })

        }

    } catch (error:any) {
        console.log("Payment error:", error);
        showError(error.message)
    } finally {
        setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}
     className="payment-form"
    >
        <ErrorDisplay />
        <div className="form-group">
            <CardElement />
        </div>
        <button type="submit" disabled={!stripe || loading} className="pay-button">
            {loading ? "Processing..." : `Pay €${amount}`}
        </button>
    </form>
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
