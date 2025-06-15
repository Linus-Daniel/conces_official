import { FaTrophy } from "react-icons/fa6";


type AchievementProps = {
  title: string;
  date: string;
  description: string;
};
const AchievementItem = ({ title, date, description }:AchievementProps) => (
    <div className="flex items-start">
      <div className="mr-3 mt-1">
        <FaTrophy className="text-conces-gold" />
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-600 mb-1">{description}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
  );
  export default AchievementItem;