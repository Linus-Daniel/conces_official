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
  ]
// Events Content Component
const Event = () => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-conces-blue">Upcoming Events</h2>
      
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>

    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Event Categories</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <CategoryCard
          title="Workshops"
          count={12}
          color="bg-blue-100 text-blue-800"
        />
        <CategoryCard
          title="Hackathons"
          count={3}
          color="bg-purple-100 text-purple-800"
        />
        <CategoryCard
          title="Career"
          count={8}
          color="bg-green-100 text-green-800"
        />
        <CategoryCard
          title="Faith"
          count={5}
          color="bg-yellow-100 text-yellow-800"
        />
      </div>
    </div>
  </div>
);

export default Event