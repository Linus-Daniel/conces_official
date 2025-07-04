// /alumni/profile/mine
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-royal-900">Your Profile</h1>
        <Button className="bg-gold-600 hover:bg-gold-700 text-royal-900">
          Save Changes
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-royal-800 border-b border-royal-200 pb-2">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName" className="text-royal-700">
                  First Name
                </Label>
                <Input id="firstName" className="border-royal-300" />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-royal-700">
                  Last Name
                </Label>
                <Input id="lastName" className="border-royal-300" />
              </div>
              <div>
                <Label htmlFor="email" className="text-royal-700">
                  Email
                </Label>
                <Input id="email" type="email" className="border-royal-300" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-royal-700">
                  Phone
                </Label>
                <Input id="phone" className="border-royal-300" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-royal-800 border-b border-royal-200 pb-2">
              Professional Information
            </h2>
            <div>
              <Label htmlFor="currentRole" className="text-royal-700">
                Current Role
              </Label>
              <Input id="currentRole" className="border-royal-300" />
            </div>
            <div>
              <Label htmlFor="company" className="text-royal-700">
                Company
              </Label>
              <Input id="company" className="border-royal-300" />
            </div>
            <div>
              <Label htmlFor="bio" className="text-royal-700">
                Bio
              </Label>
              <Textarea id="bio" className="border-royal-300 min-h-[120px]" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-royal-800 border-b border-royal-200 pb-2">
              Profile Photo
            </h2>
            <div className="flex flex-col items-center gap-4">
              <div className="h-32 w-32 rounded-full bg-royal-100 border-2 border-royal-300 flex items-center justify-center">
                <span className="text-royal-500">Upload Photo</span>
              </div>
              <Button variant="outline" className="border-royal-300 text-royal-700">
                Change Photo
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-royal-800 border-b border-royal-200 pb-2">
              Social Links
            </h2>
            <div className="space-y-3">
              <div>
                <Label htmlFor="linkedin" className="text-royal-700">
                  LinkedIn
                </Label>
                <Input id="linkedin" className="border-royal-300" />
              </div>
              <div>
                <Label htmlFor="twitter" className="text-royal-700">
                  Twitter
                </Label>
                <Input id="twitter" className="border-royal-300" />
              </div>
              <div>
                <Label htmlFor="github" className="text-royal-700">
                  GitHub
                </Label>
                <Input id="github" className="border-royal-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}