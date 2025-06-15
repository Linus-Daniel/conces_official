'use client';

import React from 'react';
import {
  FaBuilding,
  FaCheckCircle,
  FaArrowUp,
  FaExclamationCircle,
  FaArrowDown,
  FaTrophy,
  FaBatteryQuarter,
} from 'react-icons/fa';

const stats = [
  {
    title: 'Total Branches',
    value: 42,
    icon: <FaBuilding className="text-royal-600 text-xl" />,
    iconBg: 'bg-royal-100',
  },
  {
    title: 'Active Branches',
    value: 36,
    icon: <FaCheckCircle className="text-green-600 text-xl" />,
    iconBg: 'bg-green-100',
    trend: {
      icon: <FaArrowUp />,
      value: '86%',
      textColor: 'text-green-600',
    },
  },
  {
    title: 'Branches w/o Leaders',
    value: 4,
    icon: <FaExclamationCircle className="text-red-600 text-xl" />,
    iconBg: 'bg-red-100',
    trend: {
      icon: <FaArrowDown />,
      value: '9.5%',
      textColor: 'text-red-600',
    },
  },
  {
    title: 'Top Performing',
    value: 'UNILAG Branch',
    icon: <FaTrophy className="text-yellow-600 text-xl" />,
    iconBg: 'bg-yellow-100',
    isText: true,
  },
  {
    title: 'Least Active',
    value: 'FUTO Branch',
    icon: <FaBatteryQuarter className="text-gray-600 text-xl" />,
    iconBg: 'bg-gray-100',
    isText: true,
  },
];

const BranchSummary = () => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className={`flex-shrink-0 rounded-md p-3 ${item.iconBg}`}>
                {item.icon}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {item.title}
                  </dt>
                  <dd className="flex items-baseline">
                    <div
                      className={`${
                        item.isText ? 'text-lg' : 'text-2xl'
                      } font-semibold text-gray-900 truncate`}
                    >
                      {item.value}
                    </div>
                    {item.trend && (
                      <div
                        className={`ml-2 text-sm flex items-center gap-1 ${item.trend.textColor}`}
                      >
                        {item.trend.icon} {item.trend.value}
                      </div>
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BranchSummary;
