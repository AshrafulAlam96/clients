import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
      <p className="mt-3 text-gray-600">
        Your payment was processed successfully.  
        Your scholarship application has been submitted.
      </p>

      <Link to="/dashboard/student/applications" className="btn btn-primary mt-6">
        Go to My Applications
      </Link>
    </div>
  );
};

export default PaymentSuccess;
