import TopScholarships from "../components/TopScholarships";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div className="space-y-20">

      {/* HERO SECTION */}
      <section className="rounded-xl overflow-hidden">
        <Banner></Banner>
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
