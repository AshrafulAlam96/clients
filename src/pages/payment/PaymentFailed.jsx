import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-red-600">Payment Failed ❌</h1>
      <p className="mt-3 text-gray-600">
        Something went wrong with your transaction.  
        Please try again or use a different card.
      </p>

      <Link to="/" className="btn btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentFailed;
