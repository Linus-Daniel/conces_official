import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, UserCheck } from "lucide-react";

export default function MentorshipPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-royal-900">Mentorship Program</h1>
        <div className="flex gap-2">
          <Button className="bg-gold-600 hover:bg-gold-700 text-royal-900">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Request
          </Button>
          <Button variant="outline" className="border-royal-300 text-royal-700">
            <Search className="mr-2 h-4 w-4" />
            Find Mentor
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-royal-200">
          <CardHeader>
            <CardTitle className="text-royal-800">Active Mentorships</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Mentorships list */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 border border-royal-100 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-royal-100 flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-royal-600" />
                </div>
                <div>
                  <h3 className="font-medium text-royal-900">Dr. Sarah Johnson</h3>
                  <p className="text-sm text-royal-500">Computer Science</p>
                </div>
              </div>
              {/* More mentorship items */}
            </div>
          </CardContent>
        </Card>

        <Card className="border-royal-200">
          <CardHeader>
            <CardTitle className="text-royal-800">Mentorship Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full border-royal-300 text-royal-700 justify-start">
              Mentorship Guidelines
            </Button>
            <Button variant="outline" className="w-full border-royal-300 text-royal-700 justify-start">
              Success Stories
            </Button>
            <Button variant="outline" className="w-full border-royal-300 text-royal-700 justify-start">
              Become a Mentor
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-royal-200">
        <CardHeader>
          <CardTitle className="text-royal-800">Recommended Mentors</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mentors grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border border-royal-100 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-royal-100 flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-royal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-royal-900">Mentor Name</h3>
                    <p className="text-sm text-royal-500">Specialization</p>
                  </div>
                </div>
                <p className="text-sm text-royal-700 line-clamp-2">
                  Brief description about the mentor and their expertise area.
                </p>
                <Button variant="outline" size="sm" className="border-royal-300 text-royal-700">
                  View Profile
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}