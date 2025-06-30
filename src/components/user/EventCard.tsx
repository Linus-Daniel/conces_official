import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

type EventProps = {
    event:{    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    type: string;}
};

const EventCard = ({ event }:EventProps) => {
    
    const getEventColor = (type:string) => {
        switch (type) {
          case "workshop":
            return "bg-blue-500";
          case "hackathon":
            return "bg-purple-500";
          case "career":
            return "bg-green-500";
          default:
            return "bg-conces-blue";
        }
      };
      
    return (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className={`h-2 ${getEventColor(event.type)}`}></div>
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2">{event.title}</h3>
      <div className="flex items-center text-sm text-gray-600 mb-1">
        <FaCalendarAlt className="mr-2" />
        <span>{event.date}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-1">
        <FaClock className="mr-2" />
        <span>{event.time}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <FaMapMarkerAlt className="mr-2" />
        <span>{event.location}</span>
      </div>
      <button className="w-full bg-conces-blue text-white py-2 rounded-lg hover:bg-conces-blue-dark transition-colors">
        Register
      </button>
    </div>
  </div>
)};

export default EventCard;