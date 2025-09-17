import EventsComponent from "@/components/Events";
import CategoryCard from "@/components/user/CategoryCard";
import EventCard from "@/components/user/EventCard";

const events = [
  {
    id: 1,
    title: "Engineering Ethics Workshop",
    date: "May 15, 2023",
    time: "3:00 PM",
    location: "Virtual",
    type: "workshop",
  },
  {
    id: 2,
    title: "Tech Hackathon",
    date: "June 2-4, 2023",
    time: "All day",
    location: "University of Lagos",
    type: "hackathon",
  },
  {
    id: 3,
    title: "Alumni Career Panel",
    date: "June 10, 2023",
    time: "5:30 PM",
    location: "Virtual",
    type: "career",
  },
];
// Events Content Component
const page = () => (
  <div>
    <EventsComponent chapter="" />
  </div>
);

export default page;
