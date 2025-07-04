import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BecomeMentorPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-royal-900">Become a Mentor</h1>
        <p className="text-royal-600">
          Share your knowledge and experience with fellow alumni by joining our mentorship program.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-royal-800 border-b border-royal-200 pb-2">
            Expertise Areas
          </h2>
          
          <div className="space-y-2">
            <Label htmlFor="primary-expertise" className="text-royal-700">
              Primary Expertise
            </Label>
            <Select>
              <SelectTrigger className="border-royal-300">
                <SelectValue placeholder="Select your primary expertise" />
              </SelectTrigger>
              <SelectContent className="border-royal-300">
                <SelectItem value="software">Software Development</SelectItem>
                <SelectItem value="management">Management</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondary-expertise" className="text-royal-700">
              Secondary Expertise (optional)
            </Label>
            <Input id="secondary-expertise" className="border-royal-300" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills" className="text-royal-700">
              Specific Skills
            </Label>
            <Textarea
              id="skills"
              className="border-royal-300 min-h-[80px]"
              placeholder="List specific skills you can mentor on (comma separated)"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-royal-800 border-b border-royal-200 pb-2">
            Mentorship Preferences
          </h2>
          
          <div className="space-y-2">
            <Label htmlFor="mentorship-style" className="text-royal-700">
              Preferred Mentorship Style
            </Label>
            <Select>
              <SelectTrigger className="border-royal-300">
                <SelectValue placeholder="Select your preferred style" />
              </SelectTrigger>
              <SelectContent className="border-royal-300">
                <SelectItem value="casual">Casual/Informal</SelectItem>
                <SelectItem value="structured">Structured</SelectItem>
                <SelectItem value="project">Project-based</SelectItem>
                <SelectItem value="career">Career-focused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability" className="text-royal-700">
              Your Availability
            </Label>
            <Textarea
              id="availability"
              className="border-royal-300 min-h-[80px]"
              placeholder="Preferred days/times for mentoring sessions"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mentee-count" className="text-royal-700">
              Maximum Mentees
            </Label>
            <Input
              id="mentee-count"
              type="number"
              min="1"
              max="10"
              className="border-royal-300 w-20"
              defaultValue="3"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-royal-800 border-b border-royal-200 pb-2">
            Additional Information
          </h2>
          
          <div className="space-y-2">
            <Label htmlFor="why-mentor" className="text-royal-700">
              Why do you want to be a mentor?
            </Label>
            <Textarea
              id="why-mentor"
              className="border-royal-300 min-h-[100px]"
              placeholder="Share your motivation for becoming a mentor"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" className="border-royal-300" />
            <Label htmlFor="terms" className="text-royal-700">
              I agree to the mentorship program terms and guidelines
            </Label>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" className="border-royal-300 text-royal-700">
            Cancel
          </Button>
          <Button className="bg-gold-600 hover:bg-gold-700 text-royal-900">
            Submit Application
          </Button>
        </div>
      </div>
    </div>
  );
}