// Step4MentorshipSkills.tsx
import { useState } from 'react';
import { AlumniFormData } from '@/types/alumni';

export default function Step4MentorshipSkills({
  formData,
  updateFormData,
}: {
  formData: AlumniFormData;
  updateFormData: (field: keyof AlumniFormData, value: any) => void;
}) {
  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      updateFormData('skills', [...formData.skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    updateFormData('skills', formData.skills.filter(s => s !== skill));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Mentorship & Skills</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Are you currently a mentor?
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="h-4 w-4 text-royal-600 focus:ring-royal-500"
                checked={formData.isMentor}
                onChange={() => updateFormData('isMentor', true)}
              />
              <span className="ml-2 text-gray-700">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="h-4 w-4 text-royal-600 focus:ring-royal-500"
                checked={!formData.isMentor}
                onChange={() => updateFormData('isMentor', false)}
              />
              <span className="ml-2 text-gray-700">No</span>
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="availableForMentorship"
            checked={formData.availableForMentorship}
            onChange={(e) => updateFormData('availableForMentorship', e.target.checked)}
            className="h-4 w-4 text-royal-600 focus:ring-royal-500 border-gray-300 rounded"
          />
          <label htmlFor="availableForMentorship" className="ml-2 block text-sm text-gray-700">
            Available for Mentorship
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills (Add your professional skills)
          </label>
          <div className="flex">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
              className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-royal-500"
              placeholder="e.g. JavaScript, Project Management"
            />
            <button
              type="button"
              onClick={addSkill}
              className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-royal-500"
            >
              Add
            </button>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1.5 inline-flex text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Remove</span>
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}