'use client';

import { useState } from 'react';
import { FiX, FiMapPin, FiHome, FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';

interface CreateBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateBranchModal = ({ isOpen, onClose, onSuccess }: CreateBranchModalProps) => {
  const [branchName, setBranchName] = useState('');
  const [branchLocation, setBranchLocation] = useState('');
  const [adminFullName, setAdminFullName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // 1. Create branch
      const branchRes = await fetch('/api/admin/branches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: branchName, location: branchLocation }),
      });

      if (!branchRes.ok) {
        const err = await branchRes.json();
        throw new Error(err.message || 'Failed to create branch');
      }

      const branch = await branchRes.json();

      // 2. Create branch admin linked to the branch
      const adminRes = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: adminFullName,
          email: adminEmail,
          phone: adminPhone,
          password: adminPassword,
          role: 'branch-admin',
          branch: branch.id, // or branch._id depending on your API response
        }),
      });

      if (!adminRes.ok) {
        const err = await adminRes.json();
        throw new Error(err.message || 'Failed to create branch admin');
      }

      setSuccess(true);
      // Clear form
      setBranchName('');
      setBranchLocation('');
      setAdminFullName('');
      setAdminEmail('');
      setAdminPhone('');
      setAdminPassword('');
      
      // Call success callback if provided
      if (onSuccess) onSuccess();
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center sticky top-0 bg-white p-4 border-b z-10">
          <h2 className="text-xl font-semibold text-gray-900">Create New Branch and Admin</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Branch Details</h3>
            
            <div>
              <label htmlFor="branchName" className="block text-sm font-medium text-gray-700 mb-1">
                Branch Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiHome className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="branchName"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                  placeholder="e.g. UNILAG Branch"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="branchLocation" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="branchLocation"
                  value={branchLocation}
                  onChange={(e) => setBranchLocation(e.target.value)}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                  placeholder="e.g. University of Lagos, Lagos"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Branch Admin Details</h3>
            
            <div>
              <label htmlFor="adminFullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="adminFullName"
                  value={adminFullName}
                  onChange={(e) => setAdminFullName(e.target.value)}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                  placeholder="Admin's full name"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="adminEmail"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                  placeholder="Admin's email"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="adminPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="adminPhone"
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                  placeholder="Admin's phone number"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="adminPassword"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                  placeholder="Admin's password"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </section>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 text-green-600 rounded-md">
              Branch and admin created successfully!
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Branch'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBranchModal;