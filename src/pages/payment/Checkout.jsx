import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutFormInner = ({ scholarshipId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth() || {};
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    // Create payment intent on server
    const createResp = await axios.post("/payments/create-payment-intent", {
      amount,
      scholarshipId
    }, { headers: { Authorization: `Bearer ${token}` }});

    const clientSecret = createResp.data.clientSecret;

    const card = elements.getElement(CardElement);
    const confirm = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card, billing_details: { name: user?.displayName || user?.email } }
    });

    if (confirm.error) {
      alert(confirm.error.message);
      setLoading(false);
      return;
    }

    if (confirm.paymentIntent.status === "succeeded") {
      // call backend confirm to create application record (or webhook can handle)
      await axios.post("/payments/confirm", {
        paymentIntentId: confirm.paymentIntent.id,
        scholarshipId
      }, { headers: { Authorization: `Bearer ${token}` }});

      navigate("/payment/success");
    } else {
      navigate("/payment/failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-4 border rounded" />
      <button className="btn btn-primary" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
};

const Checkout = () => {
  const search = new URLSearchParams(window.location.search);
  const scholarshipId = search.get("id");
  // you should fetch scholarship amount (fees) by id or pass via state
  const amount = 50; // fetch real amount
  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutFormInner scholarshipId={scholarshipId} amount={amount} />
      </Elements>
    </div>
  );
};

export default Checkout;
