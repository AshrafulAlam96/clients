// src/components/Testimonials.jsx
import React from "react";

const testimonials = [
  {
    name: "— Sarah,",
    country: "Germany",
    quote:
      "ScholarStream helped me find a full-funded scholarship in Europe !",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    name: "— Ahmed,",
    country: "Malaysia",
    quote:
      "The application process was simple and transparent !",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    name: "— Maria,",
    country: "Canada",
    quote:
      "I loved the clean UI and fast application review system!",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-10 shadow-2xl">
      <h2 className="text-3xl font-bold text-center mb-10">
        📣 Success Stories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flip-card group perspective h-80"
          >
            <div className="flip-card-inner relative w-full h-full text-center transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
              {/* Front */}
              <div className="flip-card-front absolute inset-0 bg-amber-50 border border-gray-200 rounded-2xl shadow-md flex flex-col justify-center items-center backface-hidden">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-blue-300 shadow-md"
                />
                <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
                <p className="text-sm text-gray-700 mt-1">From {t.country}</p>
              </div>

              {/* Back */}
              <div className="flip-card-back absolute inset-0 bg-blue-950 text-amber-50 rounded-2xl shadow-md flex flex-col justify-center items-center p-6 rotate-y-180 backface-hidden">
                <p className="text-sm italic leading-relaxed">“{t.quote}”</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
