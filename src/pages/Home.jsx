import { motion } from "framer-motion";
import TopScholarships from "../components/TopScholarships";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";

const Home = () => {
  return (
    <div className="space-y-20">

      {/* HERO SECTION */}
      <section className="text-center py-20 bg-base-200 rounded-xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-4"
        >
          Find the Perfect Scholarship for Your Future
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg max-w-2xl mx-auto mb-6"
        >
          Discover global opportunities, apply with ease, and unlock your academic journey
          with ScholarStream.
        </motion.p>

        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="btn btn-primary"
        >
          Search Scholarships
        </motion.button>
      </section>

      {/* TOP 6 SCHOLARSHIPS SECTION */}
      <TopScholarships />

      {/* TESTIMONIALS SECTION */}
      <Testimonials />

      {/* FAQ SECTION */}
      <FAQ />
      
    </div>
  );
};

export default Home;
