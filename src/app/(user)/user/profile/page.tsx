import { FaCalendarAlt } from "react-icons/fa";
import { FaBook, FaComments } from "react-icons/fa6";

// Profile Content Component
const ProfileContent = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col items-center">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <h2 className="text-xl font-bold">John Doe</h2>
          <p className="text-conces-blue">Student Member</p>
          <p className="text-gray-600 text-sm mt-1">University of Lagos</p>

          <div className="mt-4 w-full">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Profile Completion</span>
              <span className="font-medium">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-conces-blue h-2 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Contact Information</h3>
          <p className="text-sm text-gray-600 mb-1">
            john.doe@student.unilag.edu.ng
          </p>
          <p className="text-sm text-gray-600">+234 812 345 6789</p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Engineering Discipline</h3>
          <p className="text-sm text-gray-600">Computer Engineering</p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Member Since</h3>
          <p className="text-sm text-gray-600">January 2021</p>
        </div>
      </div>
    </div>

    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Update Your Profile</h2>

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
                defaultValue="John"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
                defaultValue="Doe"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="institution"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Institution
            </label>
            <select
              id="institution"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
            >
              <option>University of Lagos</option>
              <option>University of Ibadan</option>
              <option>University of Nigeria, Nsukka</option>
              <option>Obafemi Awolowo University</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="discipline"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Engineering Discipline
            </label>
            <select
              id="discipline"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
            >
              <option>Computer Engineering</option>
              <option>Electrical Engineering</option>
              <option>Mechanical Engineering</option>
              <option>Civil Engineering</option>
              <option>Chemical Engineering</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
              placeholder="Tell us about yourself and your engineering interests..."
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Skills
            </label>
            <input
              type="text"
              id="skills"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-conces-blue focus:border-conces-blue"
              placeholder="Add your technical skills separated by commas"
            />
          </div>

          <button
            type="submit"
            className="bg-conces-blue text-white px-4 py-2 rounded-lg hover:bg-conces-blue-dark transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default ProfileContent