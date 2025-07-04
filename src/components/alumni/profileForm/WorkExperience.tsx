// Step3WorkExperience.tsx
import { AlumniFormData } from '@/types/alumni';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function Step3WorkExperience({
  formData,
  updateFormData,
}: {
  formData: AlumniFormData;
  updateFormData: (field: keyof AlumniFormData, value: any) => void;
}) {
  const addWorkExperience = () => {
    updateFormData('workExperience', [
      ...formData.workExperience,
      { title: '', organization: '', duration: '', description: '', id: Date.now().toString() }
    ]);
  };

  const removeWorkExperience = (id: string) => {
    if (formData.workExperience.length > 1) {
      updateFormData('workExperience', formData.workExperience.filter(work => work.id !== id));
    }
  };

  const updateWorkExperience = (id: string, field: string, value: string) => {
    updateFormData('workExperience', formData.workExperience.map(work => 
      work.id === id ? { ...work, [field]: value } : work
    ));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Work Experience</h2>
      
      {formData.workExperience.map((work, index) => (
        <div key={work.id} className="mb-6 pb-6 border-b border-gray-200 last:border-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Experience #{index + 1}</h3>
            {formData.workExperience.length > 1 && (
              <button
                type="button"
                onClick={() => removeWorkExperience(work.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={work.title}
                onChange={(e) => updateWorkExperience(work.id, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={work.organization}
                onChange={(e) => updateWorkExperience(work.id, 'organization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={work.duration}
              onChange={(e) => updateWorkExperience(work.id, 'duration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
              placeholder="e.g. Jan 2020 - Present"
              required
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={work.description}
              onChange={(e) => updateWorkExperience(work.id, 'description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addWorkExperience}
        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500"
      >
        <FaPlus className="mr-2" />
        Add Another Experience
      </button>
    </div>
  );
}