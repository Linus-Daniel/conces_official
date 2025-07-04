// Step1PersonalDetails.tsx
import { AlumniFormData } from "@/types/alumni";
export default function Step1PersonalDetails({
  formData,
  updateFormData,
}: {
  formData: AlumniFormData;
  updateFormData: (field: keyof AlumniFormData, value: any) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Graduation Year <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.graduationYear}
            onChange={(e) => updateFormData('graduationYear', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specialization <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.specialization}
            onChange={(e) => updateFormData('specialization', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
            required
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current Role <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.currentRole}
          onChange={(e) => updateFormData('currentRole', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
          required
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bio
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => updateFormData('bio', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
        />
      </div>
    </div>
  );
}