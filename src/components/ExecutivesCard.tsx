import { FaXTwitter, FaLinkedin } from "react-icons/fa";

export default function ExecutiveCard({ executive }: { executive: any }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img
          src={executive.image}
          alt={executive.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-dark mb-1">{executive.name}</h3>
        <p className="text-primary font-medium mb-3">{executive.role}</p>
        <p className="text-gray-600 mb-4">{executive.bio}</p>
        <div className="flex space-x-4">
          <a
            href={executive.social.twitter}
            className="text-gray-500 hover:text-primary transition-colors"
          >
            <FaXTwitter className="text-xl" />
          </a>
          <a
            href={executive.social.linkedin}
            className="text-gray-500 hover:text-primary transition-colors"
          >
            <FaLinkedin className="text-xl" />
          </a>
        </div>
      </div>
    </div>
  );
}
