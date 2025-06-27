import React from 'react';
import { FaPray } from 'react-icons/fa';
import { 
  FaArrowRight, 
  FaBookOpen, 
  FaBrain, 
  FaComments, 
  FaNetworkWired, 
  FaScrewdriverWrench 
} from 'react-icons/fa6';

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgIcon: React.ReactNode;
};

const featuresData: Feature[] = [
  {
    id: 'mentorship',
    title: 'Mentorship Programs',
    description: 'Connect with experienced Christian engineers who can guide your spiritual and professional growth through one-on-one mentoring.',
    icon: <FaBrain className="text-royal-600 mr-2" size={18} />,
    bgIcon: <FaBrain className="text-white" size={48} />
  },
  {
    id: 'workshops',
    title: 'Workshops & Certification',
    description: 'Enhance your skills through specialized technical workshops and faith-based professional development programs.',
    icon: <FaBookOpen className="text-royal-600 mr-2" size={18} />,
    bgIcon: <FaBookOpen className="text-white" size={48} />
  },
  {
    id: 'projects',
    title: 'Projects & Hackathons',
    description: 'Apply your skills in real-world projects and competitions that solve problems for churches, communities, and missions.',
    icon: <FaScrewdriverWrench className="text-royal-600 mr-2" size={18} />,
    bgIcon: <FaScrewdriverWrench className="text-white" size={48} />
  },
  {
    id: 'devotionals',
    title: 'Devotionals & Prayer Wall',
    description: 'Strengthen your faith through engineering-themed devotionals and a community prayer wall for support and encouragement.',
    icon: <FaPray className="text-royal-600 mr-2" size={18} />,
    bgIcon: <FaPray className="text-white" size={48} />
  },
  {
    id: 'alumni',
    title: 'Alumni Network',
    description: 'Access a powerful network of Christian engineering professionals across Nigeria and beyond for career opportunities.',
    icon: <FaNetworkWired className="text-royal-600 mr-2" size={18} />,
    bgIcon: <FaNetworkWired className="text-white" size={48} />
  },
  {
    id: 'community',
    title: 'Community Chat & Forums',
    description: 'Engage in discussions, seek advice, and share insights with fellow Christian engineers through our digital platforms.',
    icon: <FaComments className="text-royal-600 mr-2" size={18} />,
    bgIcon: <FaComments className="text-white" size={48} />
  }
];

const Features = () => {
  return (
    <section id="features" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 bg-royal-100 text-royal-700 font-medium rounded-full text-xs md:text-sm mb-3">
            Member Benefits
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            What You <span className="text-royal-700">Get</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-gold-400 mx-auto mb-6 md:mb-8"></div>
          <p className="max-w-3xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg">
            CONCES offers a comprehensive package of resources, opportunities,
            and community support to help you thrive in your faith and
            engineering career.
          </p>
        </div>

        {/* Features Grid - 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {featuresData.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature }: { feature: Feature }) => {
  return (
    <div
      id={`feature-${feature.id}`}
      className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col"
    >
      {/* Card Header with Icon */}
      <div className="h-32 sm:h-36 md:h-40 bg-royal-600 relative flex-shrink-0">
        <div className="absolute inset-0 flex items-center justify-center">
          {feature.bgIcon}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-12 md:h-20 bg-gradient-to-t from-royal-600 to-transparent"></div>
      </div>
      
      {/* Card Content */}
      <div className="p-4 sm:p-5 md:p-6 flex-grow flex flex-col">
        <h3 className="text-sm sm:text-lg md:text-xl font-bold mb-2 md:mb-3 flex items-center">
          <div className='hidden sm:block'>

          {feature.icon}
          </div>
          <span className="line-clamp-2">{feature.title}</span>
        </h3>
        <p className="text-gray-600  text-xs sm:text-sm md:text-base mb-3 md:mb-4 flex-grow">
          {feature.description}
        </p>
        <div className="mt-auto">
          <span className="text-royal-600 font-medium hover:text-royal-800 flex items-center text-xs sm:text-sm cursor-pointer">
            Learn more
            <FaArrowRight className="ml-2" size={12} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Features;