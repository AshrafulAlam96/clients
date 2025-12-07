import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo + Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">ScholarStream</h2>
          <p className="text-sm">Made with ❤️ — React, Tailwind, DaisyUI</p>
        </div>

        {/* Company */}
        <div>
          <h3 className="footer-title">Company</h3>
          <ul className="space-y-1">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/mission">Our Mission</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="footer-title">Resources</h3>
          <ul className="space-y-1">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="footer-title">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-sm border-t pt-4">
        © {new Date().getFullYear()} ScholarStream. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;