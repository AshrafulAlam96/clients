const Testimonials = () => {
  return (
    <section className="bg-base-200 p-10 rounded-xl">
      <h2 className="text-3xl font-semibold text-center mb-8">Success Stories</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-base-100 rounded-xl shadow">
          <p>"ScholarStream helped me find a full-funded scholarship in Europe!"</p>
          <h4 className="font-bold mt-3">— Sarah, Germany</h4>
        </div>

        <div className="p-6 bg-base-100 rounded-xl shadow">
          <p>"The application process was simple and transparent."</p>
          <h4 className="font-bold mt-3">— Ahmed, Malaysia</h4>
        </div>

        <div className="p-6 bg-base-100 rounded-xl shadow">
          <p>"I loved the clean UI and fast application review system!"</p>
          <h4 className="font-bold mt-3">— Maria, Canada</h4>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
