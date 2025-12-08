import { motion } from "framer-motion";

const dummyScholarships = [
  { id: 1, name: "Global Excellence Award", university: "Harvard University", fees: 20 },
  { id: 2, name: "Merit-Based EU Grant", university: "University of Oxford", fees: 18 },
  { id: 3, name: "ASEAN Full Ride", university: "National University Singapore", fees: 10 },
  { id: 4, name: "Commonwealth Scholarship", university: "Cambridge University", fees: 22 },
  { id: 5, name: "Tech Innovator Bursary", university: "MIT", fees: 25 },
  { id: 6, name: "Leaders Fellowship", university: "Stanford University", fees: 15 },
];

const TopScholarships = () => {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-8 text-center">Top Scholarships</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyScholarships.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card bg-base-100 shadow-xl"
          >
            <div className="card-body">
              <h3 className="card-title">{item.name}</h3>
              <p className="text-sm">{item.university}</p>
              <p className="font-semibold">Fees: ${item.fees}</p>

              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">View Details</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopScholarships;
