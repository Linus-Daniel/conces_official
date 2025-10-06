import React from "react";
import { FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

// Types for better type safety
interface FooterLink {
  label: string;
  href?: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string; // For accessibility
}

// Footer data (consistent structure, easy to extend)
const footerSections: FooterSection[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/store?category=products" },
      { label: "Apparel", href: "/store?category=apparel" },
      { label: "Cloths", href: "/store?category=accessories" },
      { label: "Books", href: "/store?category=books" },
      { label: "Gadgets", href: "/store?category=gift-cards" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "FAQs", href: "/faq" },
      
    ],
  },
  {
    title: "About CONCES",
    links: [
      { label: "Our Mission and vision", href: "/about?tab=mission" },
      { label: "History", href: "/about?tab=history" },
      { label: "Pillars", href: "/about?tab=pillars" },
      { label: "Statements of Faith", href: "/about?tab=faith" },
      { label: "Executives", href: "/executives" },
    ],
  },
];

const socialLinks: SocialLink[] = [
  {
    icon: <FaFacebook />,
    href: "https://www.facebook.com/share/173jPb1P73/",
    label: "Facebook",
  },
  {
    icon: <FaInstagram />,
    href: "https://www.instagram.com/concesofficial?igsh=MXZ4aW5wb2Q5M2IxNg==",
    label: "Instagram",
  },
  {
    icon: <FaXTwitter />,
    href: "https://x.com/concesofficial?t=l3hLqtzs5ZHcgBrUV0PfNw&s=09",
    label: "Twitter",
  },
  {
    icon: <FaYoutube />,
    href: "https://youtube.com/@concesofficial",
    label: "YouTube",
  },
  {
    icon: <FaTiktok />,
    href: "https://www.tiktok.com/@concesofficial?_t=ZS-8zDzAKrmNYj&_r=1",
    label: "TikTok",
  },
  {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/concesofficial?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    label: "LinkedIn",
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

// Reusable Link Component
const FooterLink: React.FC<{
  href?: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}> = ({ href, children, external = false, className = "" }) => {
  const baseClasses =
    "hover:text-white transition-colors duration-200 cursor-pointer";
  const combinedClasses = `${baseClasses} ${className}`;

  if (!href) {
    return <span className={combinedClasses}>{children}</span>;
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={combinedClasses}>
      {children}
    </a>
  );
};

function Footer() {
  return (
    <footer
      id="footer"
      className="bg-gray-800 text-white pt-12 pb-6"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company info and social links */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-serif font-bold mb-4">CONCES</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering students through faith-centered education and community
              support.
            </p>

            {/* Social Media Links */}
            <div
              className="flex flex-wrap gap-4"
              role="list"
              aria-label="Social media links"
            >
              {socialLinks.map(({ icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-lg p-1 rounded hover:bg-gray-700"
                  aria-label={`Follow us on ${label}`}
                  role="listitem"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer navigation sections */}
          {footerSections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {section.title}
              </h4>
              <nav aria-label={section.title}>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <FooterLink
                        href={link.href}
                        external={link.external}
                        className="text-gray-400 text-sm"
                      >
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom section with copyright and legal links */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CONCES. All rights reserved.
            </p>

            <nav aria-label="Legal links">
              <ul className="flex flex-wrap gap-1 text-sm">
                {legalLinks.map((item, i) => (
                  <li key={i} className="flex items-center">
                    <FooterLink
                      href={item.href}
                      className="text-gray-400 px-2 py-1"
                    >
                      {item.label}
                    </FooterLink>
                    {i < legalLinks.length - 1 && (
                      <span className="text-gray-600">•</span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
