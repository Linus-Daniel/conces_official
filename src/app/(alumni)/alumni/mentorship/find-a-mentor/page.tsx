import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FindMentorPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-royal-900">Find a Mentor</h1>
          <p className="text-royal-600">
            Connect with experienced alumni who can guide you in your career journey
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-royal-300 text-royal-700">
            Advanced Search
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by name, skills, or company"
          className="border-royal-300 flex-1"
        />
        <Select>
          <SelectTrigger className="border-royal-300 w-[180px]">
            <SelectValue placeholder="Filter by field" />
          </SelectTrigger>
          <SelectContent className="border-royal-300">
            <SelectItem value="all">All Fields</SelectItem>
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="health">Health Sciences</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-gold-600 hover:bg-gold-700 text-royal-900">
          Search
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="border border-royal-200 rounded-lg overflow-hidden">
            <div className="bg-royal-50 p-4 flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-royal-100 flex items-center justify-center">
                <span className="text-royal-600 font-medium">M{item}</span>
              </div>
              <div>
                <h3 className="font-bold text-royal-900">Mentor Name</h3>
                <p className="text-sm text-royal-600">Current Position</p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h4 className="text-sm font-medium text-royal-700">Expertise</h4>
                <p className="text-sm text-royal-600">Primary Field of Expertise</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-royal-700">Specialization</h4>
                <p className="text-sm text-royal-600">Specific skills and knowledge</p>
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="outline" size="sm" className="border-royal-300 text-royal-700">
                  View Profile
                </Button>
                <Button size="sm" className="bg-gold-600 hover:bg-gold-700 text-royal-900">
                  Request Mentorship
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" className="border-royal-300 text-royal-700">
          Load More
        </Button>
      </div>
    </div>
  );
}