const FAQ = () => {
  return (
    <section>
      <h2 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>

      <div className="space-y-4">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            How do I apply for scholarships?
          </div>
          <div className="collapse-content">
            <p>Browse details, click apply, complete payment and you're done!</p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            How does the payment work?
          </div>
          <div className="collapse-content">
            <p>We use secure Stripe payment gateway for all applications.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
