import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Users, Briefcase, MessageSquare } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-royal-900">Alumni Dashboard</h1>
        <Button className="bg-gold-600 hover:bg-gold-700 text-royal-900">
          Quick Action
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-royal-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-royal-700">
              Total Alumni
            </CardTitle>
            <Users className="h-4 w-4 text-royal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-royal-900">1,248</div>
            <p className="text-xs text-royal-500">+12% from last year</p>
          </CardContent>
        </Card>

        <Card className="border-royal-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-royal-700">
              Active Mentors
            </CardTitle>
            <Briefcase className="h-4 w-4 text-royal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-royal-900">86</div>
            <p className="text-xs text-royal-500">+5 new this month</p>
          </CardContent>
        </Card>

        <Card className="border-royal-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-royal-700">
              Upcoming Events
            </CardTitle>
            <Activity className="h-4 w-4 text-royal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-royal-900">4</div>
            <p className="text-xs text-royal-500">Next event in 3 days</p>
          </CardContent>
        </Card>

        <Card className="border-royal-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-royal-700">
              New Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-royal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-royal-900">3</div>
            <p className="text-xs text-royal-500">Since last login</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-royal-200">
          <CardHeader>
            <CardTitle className="text-royal-800">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Activity feed component */}
          </CardContent>
        </Card>

        <Card className="border-royal-200">
          <CardHeader>
            <CardTitle className="text-royal-800">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-royal-300 text-royal-700">
              Update Profile
            </Button>
            <Button variant="outline" className="border-royal-300 text-royal-700">
              Find Mentor
            </Button>
            <Button variant="outline" className="border-royal-300 text-royal-700">
              Post Story
            </Button>
            <Button variant="outline" className="border-royal-300 text-royal-700">
              View Events
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}