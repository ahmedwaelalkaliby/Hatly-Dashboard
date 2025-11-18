import React from 'react';

export default function Timeline({ items }) {
  return (
    <ol className="relative border-s border-blue-500 dark:border-gray-700 my-4 ml-3">
      {items.map((item, index) => (
        <li key={index} className="mb-10 ms-7 bg-gradient-to-r from-primary-900 to-primary-800 rounded-lg px-4 py-2">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-black rounded-full -start-3 ring-8 ring-black">
            {item.icon}
          </span>
          <h3 className="mb-1 text-lg font-bold text-blue-300">
            {item.title}
          </h3>
          <div className="bg-white/10 backdrop-blur-sm rounded-md px-3 py-2 text-lg font-semibold text-white">
            {item.value}
          </div>
        </li>
      ))}
    </ol>
  );
}