"use client"
import React, { useState, useEffect } from "react";
import {
  FaSearch, FaEdit, FaTrash, FaUserPlus, FaUserShield, FaTimes,
  FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaChevronDown, FaChevronUp,
  FaFilter, FaSave, FaCheck, FaSpinner
} from "react-icons/fa";



type User = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'admin' | 'branch-admin' | 'user';
  branch?: string;
  location?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastActive?: string;
};

type SortConfig = {
  key: keyof User;
  direction: 'asc' | 'desc';
};

export default function UsersManagement({users}:{users:User[]}) {
  // State
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ start?: string; end?: string }>({});
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'fullName', direction: 'asc' });
  const [savedFilters, setSavedFilters] = useState<{fullName: string, filters: any}[]>([]);
  const [activeFilterPreset, setActiveFilterPreset] = useState<string | null>(null);

console.log(users)
  // Sorting
  const sortedUsers = [...users].sort((a, b) => {
    if ((a[sortConfig.key] ?? '') < (b[sortConfig.key] ?? '')) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if ((a[sortConfig.key] ?? '') > (b[sortConfig.key] ?? '')) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filtering
  const filteredUsers = sortedUsers.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    const matchesBranch = selectedBranches.length === 0 || (user.branch && selectedBranches.includes(user.branch));
    const matchesDate = (!dateRange.start || user.createdAt >= dateRange.start) && 
                       (!dateRange.end || user.createdAt <= dateRange.end);
    return matchesSearch && matchesRole && matchesStatus && matchesBranch && matchesDate;
  });

  //modal 
  const openUserModal = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const requestSort = (key: keyof User) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const saveFilterPreset = () => {
    const presetName = prompt("Enter a fullName for this filter preset:");
    if (presetName) {
      const newPreset = {
        fullName: presetName,
        filters: {
          searchTerm,
          selectedRole,
          selectedStatus,
          selectedBranches,
          dateRange
        }
      };
      setSavedFilters([...savedFilters, newPreset]);
    }
  };

  // Render
  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-royal-DEFAULT">Users Management</h2>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="bg-royal-DEFAULT text-white px-4 py-2 rounded-lg flex items-center hover:bg-royal-dark transition">
            <FaUserPlus className="mr-2" /> Add New User
          </button>
          {selectedRows.length > 0 && (
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-700 transition">
              <FaTrash className="mr-2" /> Delete Selected ({selectedRows.length})
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium flex items-center">
            <FaFilter className="mr-2" /> Filters
          </h3>
          <div className="flex gap-2">
            {savedFilters.length > 0 && (
              <select 
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                onChange={(e) => {
                  const preset = savedFilters.find(f => f.fullName === e.target.value);
                  if (preset) {
                    setActiveFilterPreset(preset.fullName);
                    // Apply preset filters
                    const { filters } = preset;
                    setSearchTerm(filters.searchTerm);
                    setSelectedRole(filters.selectedRole);
                    setSelectedStatus(filters.selectedStatus);
                    setSelectedBranches(filters.selectedBranches);
                    setDateRange(filters.dateRange);
                  }
                }}
                value={activeFilterPreset || ''}
              >
                <option value="">Saved Filters</option>
                {savedFilters.map((filter,index) => (
                  <option key={index} value={filter.fullName}>{filter.fullName}</option>
                ))}
              </select>
            )}
            <button 
              onClick={saveFilterPreset}
              className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg"
            >
              <FaSave className="mr-1" /> Save Current
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          {/* Role Filter */}
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="branch-admin">Branch Admin</option>
            <option value="user">User</option>
          </select>
          
          {/* Status Filter */}
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-royal-DEFAULT focus:border-transparent"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Date Range */}
          <div className="flex gap-2">
            <input
              type="date"
              placeholder="From"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
              value={dateRange.start || ''}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            />
            <input
              type="date"
              placeholder="To"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
              value={dateRange.end || ''}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            />
          </div>
        </div>

        {/* Branch Multi-select (appears when branch-admin is selected) */}
        {(selectedRole === 'branch-admin' || selectedRole === 'all') && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Branches</label>
            <div className="flex flex-wrap gap-2">
              {['Lagos', 'Abuja', 'Port Harcourt'].map((branch,index) => (
                <label key={index} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-royal-DEFAULT focus:ring-royal-DEFAULT"
                    checked={selectedBranches.includes(branch)}
                    onChange={() => {
                      setSelectedBranches(prev =>
                        prev.includes(branch)
                          ? prev.filter(b => b !== branch)
                          : [...prev, branch]
                      );
                    }}
                  />
                  <span className="ml-2 text-sm">{branch}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        {loading ? (
          <div className="p-8 flex justify-center">
            <FaSpinner className="animate-spin text-2xl text-royal-DEFAULT" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No users found matching your filters</p>
            <button 
              className="mt-2 text-royal-DEFAULT hover:underline"
              onClick={() => {
                setSearchTerm('');
                setSelectedRole('all');
                setSelectedStatus('all');
                setSelectedBranches([]);
                setDateRange({});
              }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-royal-DEFAULT focus:ring-royal-DEFAULT"
                      checked={selectedRows.length === paginatedUsers.length && paginatedUsers.length > 0}
                      onChange={() => {
                        if (selectedRows.length === paginatedUsers.length) {
                          setSelectedRows([]);
                        } else {
                          setSelectedRows(paginatedUsers.map((user,index) => user.id));
                        }
                      }}
                    />
                  </th>
                  {[
                    { key: 'fullName', label: 'Name' },
                    { key: 'email', label: 'Email' },
                    { key: 'role', label: 'Role' },
                    { key: 'branch', label: 'Branch' },
                    { key: 'createdAt', label: 'Join Date' }
                  ].map((column) => (
                    <th
                      key={column.key}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort(column.key as keyof User)}
                    >
                      <div className="flex items-center">
                        {column.label}
                        {sortConfig.key === column.key && (
                          <span className="ml-1">
                            {sortConfig.direction === 'asc' ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedUsers.map((user,index) => (
                  <tr 
                    key={index} 
                    className={`hover:bg-gray-50 ${selectedRows.includes(user.id) ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-royal-DEFAULT focus:ring-royal-DEFAULT"
                        checked={selectedRows.includes(user.id)}
                        onChange={() => toggleRowSelection(user.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td 
                      className="px-4 py-4 whitespace-nowrap cursor-pointer"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowModal(true);
                      }}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <FaUserShield className="text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                        </div>
                      </div>
                    </td>
                    <td 
                      className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowModal(true);
                      }}
                    >
                      {user.email}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                        user.role === 'admin' ? 'bg-royal-DEFAULT text-white' : 
                        user.role === 'branch-admin' ? 'bg-purple-100 text-purple-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.branch || '-'}
                    </td>
                   
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-royal-DEFAULT hover:text-royal-dark mr-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(user);
                          setShowModal(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle delete
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of{' '}
                    <span className="font-medium">{filteredUsers.length}</span> results
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 mr-2">Rows per page:</span>
                    <select
                      className="border border-gray-300 rounded-md text-sm py-1 pl-2 pr-8"
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      {[5, 10, 20, 50].map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">First</span>
                      «
                    </button>
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Previous</span>
                      ‹
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === pageNum
                              ? 'z-10 bg-royal-DEFAULT border-royal-DEFAULT text-white'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Next</span>
                      ›
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Last</span>
                      »
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* User Detail Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 transition-opacity" 
              aria-hidden="true"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-gray-500/70 backdrop-blur-sm ">


            {/* Modal container */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <FaUserShield className="text-gray-500 text-xl" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {selectedUser.fullName}
                      </h3>
                      {/* <p className="text-sm text-gray-500">
                        {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                      </p> */}
                    </div>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-6">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      <button className="border-b-2 border-royal-DEFAULT text-royal-DEFAULT px-1 py-2 text-sm font-medium">
                        Profile
                      </button>
                      <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 px-1 py-2 text-sm font-medium">
                        Activity
                      </button>
                      <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 px-1 py-2 text-sm font-medium">
                        Permissions
                      </button>
                    </nav>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <FaUserShield className="flex-shrink-0 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-900">{selectedUser.email}</span>
                        </div>
                        {selectedUser.phone && (
                          <div className="flex items-center">
                            <FaPhone className="flex-shrink-0 mr-2 text-gray-400" />
                            <span className="text-sm text-gray-900">{selectedUser.phone}</span>
                          </div>
                        )}
                        {selectedUser.location && (
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="flex-shrink-0 mr-2 text-gray-400" />
                            <span className="text-sm text-gray-900">{selectedUser.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Status</h4>
                      {/* <span className={`px-2 py-1 text-xs rounded-full ${
                        selectedUser.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                      </span> */}
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Branch</h4>
                      <p className="text-sm text-gray-900">
                        {selectedUser.branch || 'N/A'}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Join Date</h4>
                      <div className="flex items-center">
                        <FaCalendarAlt className="flex-shrink-0 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-900">{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Last Active</h4>
                      <div className="flex items-center">
                        <FaCalendarAlt className="flex-shrink-0 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {selectedUser.lastActive ? new Date(selectedUser.lastActive).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-royal-DEFAULT text-base font-medium text-white hover:bg-royal-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-DEFAULT sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    // Handle edit action
                    closeModal();
                  }}
                >
                  Edit User
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-DEFAULT sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
            </div>


            </div>



          </div>
        </div>
      )}
    </div>
  );
}