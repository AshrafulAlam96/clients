import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const CheckoutForm = ({ scholarshipId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/payments/create-payment-intent",
        { amount, scholarshipId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const result = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: user?.email,
              name: user?.displayName || "ScholarStream User"
            }
          }
        }
      );

      if (result.error) {
        alert(result.error.message);
        setLoading(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        navigate("/payment/success");
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-4 border rounded" />
      <button
        className="btn btn-primary w-full"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
};

const Checkout = () => {
  const params = new URLSearchParams(window.location.search);
  const scholarshipId = params.get("id");
  const amount = 50; // TODO: fetch from backend

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4">
        Scholarship Application Fee
      </h1>

      <Elements stripe={stripePromise}>
        <CheckoutForm
          scholarshipId={scholarshipId}
          amount={amount}
        />
      </Elements>
    </div>
  );
};

export default Checkout;
