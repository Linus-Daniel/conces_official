"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import api from "@/lib/axiosInstance";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BecomeMentorPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    primaryExpertise: "",
    secondaryExpertise: "",
    skills: "",
    mentorshipStyle: "",
    preferredTimes: "",
    maxMentees: 3,
    motivation: "",
    experience: "",
    acceptedTerms: false,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 2));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        if (!form.primaryExpertise) {
          toast.error("Please select your primary expertise");
          return false;
        }
        return true;
      case 1:
        if (!form.mentorshipStyle || !form.preferredTimes) {
          toast.error("Please fill all required fields");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!form.acceptedTerms) {
      toast.error("You must accept the terms to continue.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/mentor/request", form);
      toast.success("Mentor request submitted successfully!");
      setForm({
        primaryExpertise: "",
        secondaryExpertise: "",
        skills: "",
        mentorshipStyle: "",
        preferredTimes: "",
        maxMentees: 3,
        motivation: "",
        experience: "",
        acceptedTerms: false,
      });
      setCurrentStep(0);
      setShowSuccessModal(true);
    } catch (error) {
      toast.error("Failed to submit mentor request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        router.push("/alumni/mentorship/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, router]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:px-6">
      {/* Progress Stepper */}
      <div className="mb-8 flex justify-center items-center">
        {[1, 2, 3].map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                currentStep >= index
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step}
            </div>
            {index < 2 && (
              <div
                className={`w-16 h-1 ${
                  currentStep > index ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Join Our Mentorship Program
        </h1>
        <p className="text-muted-foreground">
          Share your knowledge and guide the next generation of professionals
        </p>
      </div>

      <div className="bg-card border shadow-sm rounded-xl p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: currentStep > 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: currentStep > 0 ? -50 : 50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {currentStep === 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Your Expertise</h2>

                <div className="space-y-2">
                  <Label>
                    Primary Expertise <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.primaryExpertise}
                    onValueChange={(val) => handleChange("primaryExpertise", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software">Software Development</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Secondary Expertise (optional)</Label>
                  <Input
                    value={form.secondaryExpertise}
                    onChange={(e) => handleChange("secondaryExpertise", e.target.value)}
                    placeholder="E.g., UX Design, Product Management"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Specific Skills</Label>
                  <Textarea
                    value={form.skills}
                    onChange={(e) => handleChange("skills", e.target.value)}
                    placeholder="List your specific skills (comma separated)"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Mentorship Preferences</h2>

                <div className="space-y-2">
                  <Label>
                    Preferred Mentorship Style <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.mentorshipStyle}
                    onValueChange={(val) => handleChange("mentorshipStyle", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your preferred style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual (1-on-1)</SelectItem>
                      <SelectItem value="group">Group Mentoring</SelectItem>
                      <SelectItem value="hybrid">Hybrid (Both)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>
                    Your Availability <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    value={form.preferredTimes}
                    onChange={(e) => handleChange("preferredTimes", e.target.value)}
                    placeholder="Preferred days/times for mentoring sessions"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Maximum Mentees</Label>
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    value={form.maxMentees}
                    onChange={(e) => handleChange("maxMentees", Number(e.target.value))}
                    className="w-24"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Final Details</h2>

                <div className="space-y-2">
                  <Label>Why do you want to be a mentor? <span className="text-destructive">*</span></Label>
                  <Textarea
                    value={form.motivation}
                    onChange={(e) => handleChange("motivation", e.target.value)}
                    placeholder="Share your motivation for becoming a mentor"
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Relevant Experience <span className="text-destructive">*</span></Label>
                  <Textarea
                    value={form.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    placeholder="Describe your professional experience and achievements that qualify you as a mentor"
                    className="min-h-[120px]"
                  />
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={form.acceptedTerms}
                    onCheckedChange={(val: boolean) =>
                      handleChange("acceptedTerms", val)
                    }
                  />
                  <Label htmlFor="terms">
                    I agree to the{" "}
                    <a href="#" className="text-primary underline">
                      mentorship program terms and guidelines
                    </a>
                  </Label>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          {currentStep > 0 ? (
            <Button variant="outline" onClick={prevStep}>
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          ) : (
            <div></div>
          )}

          {currentStep < 2 ? (
            <Button onClick={nextStep}>
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <Check className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="text-center border-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader>
              <DialogTitle className="text-2xl text-royal-900">
                Request Sent ✅
              </DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground mt-2">
              An email will be sent to you once your mentor request is reviewed and approved.
            </p>
            <DialogFooter className="justify-center mt-6">
              <Button
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push("/alumni/mentorship/");
                }}
                className="bg-gold-600 hover:bg-gold-700 text-royal-900"
              >
                Okay
              </Button>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
