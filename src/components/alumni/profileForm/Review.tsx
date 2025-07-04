import { AlumniFormData } from '@/types/alumni';
import { Globe, Linkedin, Twitter, Github } from 'lucide-react';

export default function Step5SocialReview({ 
  formData,
  updateFormData 
}: { 
  formData: AlumniFormData,
  updateFormData: (field: keyof AlumniFormData, value: any) => void 
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect & Review</h2>
        <p className="text-gray-500">Add your social profiles and review your information</p>
      </div>
      
      <div className="space-y-6">
        {/* Social Links Section */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-1">
            <label className=" text-sm font-medium text-gray-700 flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-[#0077B5]" />
              LinkedIn
            </label>
            <div className="flex rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-royal-600">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                linkedin.com/in/
              </span>
              <input
                type="text"
                value={formData.linkedIn}
                onChange={(e) => updateFormData('linkedIn', e.target.value)}
                className="block flex-1 border-0 bg-transparent py-2 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="yourusername"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Twitter className="h-4 w-4 text-[#1DA1F2]" />
              Twitter
            </label>
            <div className="flex rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-royal-600">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                twitter.com/
              </span>
              <input
                type="text"
                value={formData.twitter}
                onChange={(e) => updateFormData('twitter', e.target.value)}
                className="block flex-1 border-0 bg-transparent py-2 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="yourhandle"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Github className="h-4 w-4 text-gray-800" />
              GitHub
            </label>
            <div className="flex rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-royal-600">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                github.com/
              </span>
              <input
                type="text"
                value={formData.github}
                onChange={(e) => updateFormData('github', e.target.value)}
                className="block flex-1 border-0 bg-transparent py-2 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="yourusername"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              Personal Website
            </label>
            <div className="flex rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-royal-600">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                https://
              </span>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => updateFormData('website', e.target.value)}
                className="block flex-1 border-0 bg-transparent py-2 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="yourwebsite.com"
              />
            </div>
          </div>
        </div>

        {/* Profile Review Section */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Profile Summary</h3>
            <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Preview
            </span>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            {/* Personal Details */}
            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-100">Personal Details</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-gray-50/50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Graduation Year</p>
                  <p className="text-sm font-medium mt-1">{formData.graduationYear || 'Not provided'}</p>
                </div>
                <div className="bg-gray-50/50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</p>
                  <p className="text-sm font-medium mt-1">{formData.specialization || 'Not provided'}</p>
                </div>
                <div className="bg-gray-50/50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Current Role</p>
                  <p className="text-sm font-medium mt-1">{formData.currentRole || 'Not provided'}</p>
                </div>
                <div className="bg-gray-50/50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Mentorship</p>
                  <p className="text-sm font-medium mt-1">
                    {formData.availableForMentorship ? (
                      <span className="text-green-600">Available</span>
                    ) : (
                      <span className="text-gray-500">Not available</span>
                    )}
                  </p>
                </div>
              </div>
              
              {formData.bio && (
                <div className="mt-4 bg-gray-50/50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Bio</p>
                  <p className="text-sm text-gray-700">{formData.bio}</p>
                </div>
              )}
            </div>

            {/* Education */}
            {formData.education.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-100">Education</h4>
                <div className="space-y-4">
                  {formData.education.map((edu, index) => (
                    <div key={index} className="bg-gray-50/50 p-4 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{edu.schoolName || 'Not provided'}</p>
                          <p className="text-sm text-gray-600 mt-1">{edu.course} • {edu.graduationYear}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Work Experience */}
            {formData.workExperience.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-100">Work Experience</h4>
                <div className="space-y-4">
                  {formData.workExperience.map((work, index) => (
                    <div key={index} className="bg-gray-50/50 p-4 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{work.title || 'Not provided'}</p>
                          <p className="text-sm text-gray-600 mt-1">{work.organization} • {work.duration}</p>
                          {work.description && (
                            <p className="text-sm text-gray-700 mt-2">{work.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {formData.skills?.length > 0 && (
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-100">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-royal-100 text-royal-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}