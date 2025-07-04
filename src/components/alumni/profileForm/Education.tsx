// Step2Education.tsx
import { AlumniFormData } from '@/types/alumni';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function Step2Education({
  formData,
  updateFormData,
}: {
  formData: AlumniFormData;
  updateFormData: (field: keyof AlumniFormData, value: any) => void;
}) {
  const addEducation = () => {
    updateFormData('education', [
      ...formData.education,
      { schoolName: '', course: '', graduationYear: '', id: Date.now().toString() }
    ]);
  };

  const removeEducation = (id: string) => {
    if (formData.education.length > 1) {
      updateFormData('education', formData.education.filter(edu => edu.id !== id));
    }
  };

  const updateEducation = (id: string, field: string, value: string) => {
    updateFormData('education', formData.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Education</h2>
      
      {formData.education.map((edu, index) => (
        <div key={edu.id} className="mb-6 pb-6 border-b border-gray-200 last:border-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Education #{index + 1}</h3>
            {formData.education.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={edu.schoolName}
                onChange={(e) => updateEducation(edu.id, 'schoolName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course/Degree <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={edu.course}
                onChange={(e) => updateEducation(edu.id, 'course', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Graduation Year <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={edu.graduationYear}
              onChange={(e) => updateEducation(edu.id, 'graduationYear', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
              required
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500"
      >
        <FaPlus className="mr-2" />
        Add Another Education
      </button>
    </div>
  );
}