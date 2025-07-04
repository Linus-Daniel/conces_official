import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-royal-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold-DEFAULT">
              About CONCES
            </h3>
            <p className="mb-4 text-gray-300">
              Providing quality Christian apparel, books, and devotionals since
              2010. Our mission is to spread faith through thoughtful products.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-gold-DEFAULT transition"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-gold-DEFAULT transition"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-gold-DEFAULT transition"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-gold-DEFAULT transition"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold-DEFAULT">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-gold-DEFAULT transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="text-gray-300 hover:text-gold-DEFAULT transition"
                >
                  Our Store
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-gold-DEFAULT transition"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-gold-DEFAULT transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-gold-DEFAULT transition"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold-DEFAULT">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-300 hover:text-gold-DEFAULT transition"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-300 hover:text-gold-DEFAULT transition"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-gold-DEFAULT transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-gold-DEFAULT transition"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="text-gray-300 hover:text-gold-DEFAULT transition"
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-gold-DEFAULT">
              Newsletter
            </h3>
            <p className="text-gray-300 mb-4">
              Subscribe to get updates on new products and special offers.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-full border-[2px] placeholder:text-white focus:outline-none text-white  focus:border-gold-DEFAULT"
                required
              />
              <button
                type="submit"
                className="bg-gold-DEFAULT hover:bg-gold-dark text-white font-medium px-4 py-2 rounded-full transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-center space-x-6 mb-6">
          <FaCcVisa
            size={30}
            className="text-gray-400 hover:text-white transition"
          />
          <FaCcMastercard
            size={30}
            className="text-gray-400 hover:text-white transition"
          />
          <FaCcPaypal
            size={30}
            className="text-gray-400 hover:text-white transition"
          />
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>
            &copy; {currentYear} CONCES Christian Store. All rights reserved.
          </p>
          <p className="mt-2 text-sm">Designed with faith in Christ</p>
        </div>
      </div>
    </footer>
  );
}
