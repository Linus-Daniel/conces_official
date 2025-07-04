import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function TalksPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-royal-900">Alumni Talks</h1>
          <p className="text-royal-600">
            Upcoming and past events featuring our alumni community
          </p>
        </div>
        <Button className="bg-gold-600 hover:bg-gold-700 text-royal-900">
          Suggest a Talk
        </Button>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-royal-800 border-b border-royal-200 pb-2">
          Upcoming Events
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((item) => (
            <div key={item} className="border border-royal-200 rounded-lg overflow-hidden">
              <div className="bg-royal-50 p-4">
                <h3 className="font-bold text-lg text-royal-900">
                  Alumni Career Panel {item}
                </h3>
                <p className="text-royal-600">
                  Insights from successful alumni across various industries
                </p>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-royal-700">
                  <Calendar className="h-4 w-4" />
                  <span>June {15 + item}, 2023</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-royal-700">
                  <Clock className="h-4 w-4" />
                  <span>6:00 PM - 8:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-royal-700">
                  <MapPin className="h-4 w-4" />
                  <span>Virtual (Zoom)</span>
                </div>
                <div className="flex justify-between pt-3">
                  <Button variant="outline" className="border-royal-300 text-royal-700">
                    More Details
                  </Button>
                  <Button className="bg-gold-600 hover:bg-gold-700 text-royal-900">
                    Register
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-royal-800 border-b border-royal-200 pb-2 mt-10">
          Past Events
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="border border-royal-200 rounded-lg overflow-hidden">
              <div className="bg-royal-50 p-4">
                <h3 className="font-bold text-lg text-royal-900">
                  {["Tech", "Business", "Health"][item % 3]} Talk Series #{item}
                </h3>
                <p className="text-royal-600 line-clamp-2">
                  {[
                    "Emerging trends in technology",
                    "Leadership in uncertain times",
                    "Innovations in healthcare",
                  ][item % 3]}
                </p>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-royal-700">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][item - 1]} {10 + item}, 2023
                  </span>
                </div>
                <div className="flex justify-between pt-3">
                  <Button variant="outline" className="border-royal-300 text-royal-700">
                    View Recording
                  </Button>
                  <Button variant="outline" className="border-royal-300 text-royal-700">
                    Speaker Info
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}