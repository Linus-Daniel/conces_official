
type CardProps = {
  name: string;
  position: string;
  institution: string;
  industry: string;
  skills: string[];
};

const AlumniCard = ({ name, position, institution, industry, skills }:CardProps) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center mb-4">
      <img
        src="https://randomuser.me/api/portraits/men/1.jpg"
        alt={name}
        className="w-12 h-12 rounded-full mr-3"
      />
      <div>
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm text-gray-600">{position}</p>
      </div>
    </div>
    <div className="mb-4">
      <p className="text-sm text-gray-600 mb-1">{institution}</p>
      <p className="text-sm text-gray-600">{industry}</p>
    </div>
    <div className="mb-4">
      <h4 className="text-xs font-semibold text-gray-500 mb-2">SKILLS</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
    <button className="w-full bg-conces-blue text-white py-2 rounded-lg hover:bg-conces-blue-dark transition-colors">
      Connect
    </button>
  </div>
);

export default AlumniCard;