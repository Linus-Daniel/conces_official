import AlumniCard from "@/components/user/AlumniCard";
import MentorshipOpportunity from "@/components/user/MentorshipOppotunity";
import { FaSearch } from "react-icons/fa";

// Network Content Component
const NetworkContent = () => (
  <div>
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-conces-blue">Alumni Network</h2>
      <p className="text-gray-600">
        Connect with CONCES alumni from various institutions and industries
      </p>
    </div>

    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold">Find Alumni</h3>
          <p className="text-sm text-gray-600">
            Search by name, institution, or industry
          </p>
        </div>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search alumni..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue">
            <option>All Industries</option>
            <option>Software Engineering</option>
            <option>Civil Engineering</option>
            <option>Mechanical Engineering</option>
            <option>Electrical Engineering</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AlumniCard
          name="Dr. Adeola Johnson"
          position="Senior Engineer at TechSolutions Ltd."
          institution="University of Lagos (2015)"
          industry="Software Engineering"
          skills={["JavaScript", "React", "Node.js"]}
        />
        <AlumniCard
          name="Engr. Michael Adebayo"
          position="Project Manager at CivilWorks Inc."
          institution="University of Ibadan (2012)"
          industry="Civil Engineering"
          skills={["Project Management", "Structural Design", "AutoCAD"]}
        />
        <AlumniCard
          name="Sarah Okafor"
          position="Product Designer at InnovateNG"
          institution="Federal University of Technology, Minna (2018)"
          industry="Mechanical Engineering"
          skills={["Product Design", "3D Modeling", "Prototyping"]}
        />
      </div>
    </div>

    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Mentorship Opportunities</h3>
      <p className="text-gray-600 mb-4">
        Connect with experienced alumni who can guide you in your career journey
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MentorshipOpportunity
          title="Career Transition Guidance"
          description="Get advice on transitioning from academia to industry"
          alumni="Dr. Femi Oladeji (Google)"
          availability="2 slots available"
        />
        <MentorshipOpportunity
          title="Technical Interview Prep"
          description="Practice for engineering technical interviews"
          alumni="Engr. Chika Nwosu (Microsoft)"
          availability="5 slots available"
        />
      </div>
    </div>
  </div>
);

export default NetworkContent;