
type MentorshipOpportunityProps = {
  title: string;
  description: string;  
    alumni: string;
    availability: string;
};
const MentorshipOpportunity = ({
    title,
    description,
    alumni,
    availability,
  }:MentorshipOpportunityProps) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="font-bold text-conces-blue mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Mentor: {alumni}</span>
        <span className="text-conces-blue">{availability}</span>
      </div>
    </div>
  );
  
export default MentorshipOpportunity;  