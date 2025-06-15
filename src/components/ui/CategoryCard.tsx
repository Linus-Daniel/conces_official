import { Category } from '@/types';
import React from 'react';

const CategoryCard = ({ icon: Icon, name, count, bgColor, iconColor }:Category) => {
  return (
    <span className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition flex flex-col items-center cursor-pointer">
      <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mb-3`}>
        <Icon className={`${iconColor} text-xl`} />
      </div>
      <h3 className="font-medium text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500 mt-1">{count} items</p>
    </span>
  );
};

export default CategoryCard;
