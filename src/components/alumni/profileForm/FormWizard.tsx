"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  User,
  GraduationCap,
  Briefcase,
  Handshake,
  Share2,
} from "lucide-react";

import { initialFormData, AlumniFormData } from "@/types/alumni";
import Step1PersonalDetails from "./PersonalDetails";
import Step2Education from "./Education";
import Step3WorkExperience from "./WorkExperience";
import Step4MentorshipSkills from "./MentorshipSkills";
import Step5SocialReview from "./Review";

const steps = [
  "Personal Details",
  "Education",
  "Work Experience",
  "Mentorship & Skills",
  "Social Links & Review",
];

export default function AlumniFormWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<AlumniFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        if (
          !formData.graduationYear ||
          !formData.specialization ||
          !formData.currentRole
        ) {
          toast.error("Please fill all required fields");
          return false;
        }
        return true;
      case 1:
        for (const edu of formData.education) {
          if (!edu.schoolName || !edu.course || !edu.graduationYear) {
            toast.error("Please fill all education fields");
            return false;
          }
        }
        return true;
      case 2:
        for (const work of formData.workExperience) {
          if (!work.title || !work.organization || !work.duration) {
            toast.error("Please fill all work experience fields");
            return false;
          }
        }
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/alumni/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Profile saved successfully!");
        // optionally reset or redirect
      } else {
        throw new Error("Failed to save profile");
      }
    } catch (error) {
      toast.error("Error saving profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof AlumniFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1PersonalDetails
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 1:
        return (
          <Step2Education formData={formData} updateFormData={updateFormData} />
        );
      case 2:
        return (
          <Step3WorkExperience
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <Step4MentorshipSkills
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <Step5SocialReview
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <ToastContainer position="top-center" />
      
      {/* Stepper - Mobile */}
      <div className="sm:hidden mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Step {currentStep + 1} of {steps.length}
          </h2>
          <span className="text-sm text-gray-500">
            {steps[currentStep]}
          </span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-royal-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Stepper - Desktop */}
      <div className="hidden sm:block relative mb-10">
        {/* Gray base line */}
        <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-200 rounded-full z-0 transform -translate-y-1/2" />

        {/* Royal blue progress bar */}
        <div
          className="absolute top-1/2 left-0 h-1.5 bg-royal-600 rounded-full z-10 transition-all duration-500 ease-in-out"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%`, transform: 'translateY(-50%)' }}
        />

        {/* Step icons */}
        <nav className="flex justify-between items-center relative z-20">
          {[User, GraduationCap, Briefcase, Handshake, Share2].map((Icon, index) => (
            <button
              key={index}
              type="button"
              onClick={() => currentStep > index && setCurrentStep(index)}
              className={`relative flex flex-col items-center group ${currentStep >= index ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= index
                    ? 'bg-royal-600 border-royal-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                <Icon size={20} />
              </div>
              <span className={`absolute top-full mt-2 text-xs font-medium text-center w-24 ${
                currentStep >= index ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {steps[index]}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-sm sm:shadow-md p-4 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: currentStep > 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: currentStep > 0 ? -50 : 50 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 mt-8 pt-6 border-t border-gray-200">
          {currentStep > 0 ? (
            <button
              onClick={prevStep}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-royal-600 hover:bg-royal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : "Submit Profile"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}