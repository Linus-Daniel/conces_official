import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-royal-900">Account Settings</h1>
        <p className="text-royal-600">
          Manage your account preferences and privacy settings
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Account Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-royal-800">
              Account Information
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName" className="text-royal-700">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  className="border-royal-300"
                  defaultValue="John"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-royal-700">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  className="border-royal-300"
                  defaultValue="Doe"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-royal-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="border-royal-300"
                  defaultValue="john.doe@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-royal-700">
                  Phone
                </Label>
                <Input
                  id="phone"
                  className="border-royal-300"
                  defaultValue="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          <Separator className="bg-royal-200" />

          {/* Privacy Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-royal-800">
              Privacy Settings
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-royal-200 p-4">
                <div>
                  <Label htmlFor="profile-visible" className="text-royal-700">
                    Make profile public
                  </Label>
                  <p className="text-sm text-royal-500">
                    Allow other alumni to view your profile
                  </p>
                </div>
                <Switch
                  id="profile-visible"
                  className="data-[state=checked]:bg-gold-600"
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-royal-200 p-4">
                <div>
                  <Label htmlFor="contact-visible" className="text-royal-700">
                    Show contact information
                  </Label>
                  <p className="text-sm text-royal-500">
                    Display email and phone on your public profile
                  </p>
                </div>
                <Switch
                  id="contact-visible"
                  className="data-[state=checked]:bg-gold-600"
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-royal-200 p-4">
                <div>
                  <Label
                    htmlFor="mentorship-visible"
                    className="text-royal-700"
                  >
                    Available for mentorship
                  </Label>
                  <p className="text-sm text-royal-500">
                    Appear in mentor searches and listings
                  </p>
                </div>
                <Switch
                  id="mentorship-visible"
                  className="data-[state=checked]:bg-gold-600"
                />
              </div>
            </div>
          </div>

          <Separator className="bg-royal-200" />

          {/* Notification Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-royal-800">
              Notifications
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-royal-200 p-4">
                <div>
                  <Label
                    htmlFor="email-notifications"
                    className="text-royal-700"
                  >
                    Email notifications
                  </Label>
                  <p className="text-sm text-royal-500">
                    Receive important updates via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  className="data-[state=checked]:bg-gold-600"
                  defaultChecked
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-royal-200 p-4">
                <div>
                  <Label
                    htmlFor="mentorship-requests"
                    className="text-royal-700"
                  >
                    Mentorship requests
                  </Label>
                  <p className="text-sm text-royal-500">
                    Get notified about new mentorship requests
                  </p>
                </div>
                <Switch
                  id="mentorship-requests"
                  className="data-[state=checked]:bg-gold-600"
                  defaultChecked
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-royal-200 p-4">
                <div>
                  <Label htmlFor="event-reminders" className="text-royal-700">
                    Event reminders
                  </Label>
                  <p className="text-sm text-royal-500">
                    Receive reminders for upcoming events
                  </p>
                </div>
                <Switch
                  id="event-reminders"
                  className="data-[state=checked]:bg-gold-600"
                  defaultChecked
                />
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions Sidebar */}
        <div className="space-y-6">
          <div className="rounded-lg border border-royal-200 p-6 space-y-4">
            <h3 className="font-medium text-royal-800">Account Actions</h3>
            <Button
              variant="outline"
              className="w-full border-royal-300 text-royal-700"
            >
              Change Password
            </Button>
            <Button
              variant="outline"
              className="w-full border-royal-300 text-royal-700"
            >
              Two-Factor Authentication
            </Button>
            <Button
              variant="outline"
              className="w-full border-royal-300 text-royal-700"
            >
              Download Data
            </Button>
          </div>

          <div className="rounded-lg border border-royal-200 p-6 space-y-4">
            <h3 className="font-medium text-royal-800">Danger Zone</h3>
            <Button
              variant="outline"
              className="w-full border-red-300 text-red-700 hover:bg-red-50"
            >
              Deactivate Account
            </Button>
            <Button
              variant="outline"
              className="w-full border-red-300 text-red-700 hover:bg-red-50"
            >
              Delete Account
            </Button>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="outline"
              className="border-royal-300 text-royal-700"
            >
              Cancel
            </Button>
            <Button className="bg-gold-600 hover:bg-gold-700 text-royal-900">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
