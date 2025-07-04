import { Button } from "@/components/ui/button";
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

export default function NewMentorshipRequestPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-royal-900">New Mentorship Request</h1>
        <p className="text-royal-600">
          Fill out this form to request mentorship from alumni in your field of interest.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="topic" className="text-royal-700">
            Mentorship Topic
          </Label>
          <Input id="topic" className="border-royal-300" placeholder="Career advice, technical skills, etc." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="field" className="text-royal-700">
            Field of Interest
          </Label>
          <Select>
            <SelectTrigger className="border-royal-300">
              <SelectValue placeholder="Select a field" />
            </SelectTrigger>
            <SelectContent className="border-royal-300">
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="health">Health Sciences</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferred-mentor" className="text-royal-700">
            Preferred Mentor (optional)
          </Label>
          <Input id="preferred-mentor" className="border-royal-300" placeholder="Name or specialization" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="goals" className="text-royal-700">
            Your Goals
          </Label>
          <Textarea
            id="goals"
            className="border-royal-300 min-h-[120px]"
            placeholder="Describe what you hope to achieve through this mentorship"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="availability" className="text-royal-700">
            Your Availability
          </Label>
          <Textarea
            id="availability"
            className="border-royal-300 min-h-[80px]"
            placeholder="Preferred days/times for meetings"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" className="border-royal-300 text-royal-700">
            Cancel
          </Button>
          <Button className="bg-gold-600 hover:bg-gold-700 text-royal-900">
            Submit Request
          </Button>
        </div>
      </div>
    </div>
  );
}