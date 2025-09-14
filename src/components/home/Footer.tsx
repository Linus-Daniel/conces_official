import React from "react";
import { FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

// Footer data (easy to extend later)
const footerSections = [
  {
    title: "Shop",
    links: ["All Products", "Apparel", "Accessories", "Books", "Gift Cards"],
  },
  {
    title: "Support",
    links: [
      "Contact Us",
      "FAQs",
      "Shipping Policy",
      "Returns & Exchanges",
      "Size Guide",
    ],
  },
  {
    title: "About CONCES",
    links: [
      "Our Mission",
      "Student Projects",
      "Scholarship Program",
      "Alumni Network",
      "Careers",
    ],
  },
];

const socialLinks = [
  {
    icon: <FaFacebook />,
    href: "https://www.facebook.com/share/173jPb1P73/",
  },
  {
    icon: <FaInstagram />,
    href: "https://www.instagram.com/concesofficial?igsh=MXZ4aW5wb2Q5M2IxNg==",
  },
  {
    icon: <FaXTwitter />,
    href: "https://x.com/concesofficial?t=l3hLqtzs5ZHcgBrUV0PfNw&s=09",
  },
  {
    icon: <FaYoutube />,
    href: "https://youtube.com/@concesofficial",
  },
  {
    Icon: <FaTiktok />,
    href: "https://www.tiktok.com/@concesofficial?_t=ZS-8zDzAKrmNYj&_r=1",
  },
  {
    Icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/concesofficial?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

function Footer() {
  return (
    <footer id="footer" className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Logo + description + socials */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">CONCES</h3>
            <p className="text-gray-400 mb-4">
              Empowering students through faith-centered education and community
              support.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white cursor-pointer text-lg"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic footer sections */}
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-medium mb-4">{section.title}</h4>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <span className="hover:text-white cursor-pointer">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright + policies */}
        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} CONCES. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item, i) => (
                  <span key={i} className="hover:text-white cursor-pointer">
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
