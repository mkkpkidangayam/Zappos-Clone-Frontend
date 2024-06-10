import React from "react";

const MobileFooter = () => {
  return (
    <div className="min-w-full bg-gray-900 mt-10">
      <footer className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-gray-300">
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-200">Brands</a></li>
            <li><a href="/" className="hover:text-gray-200">Clothing</a></li>
            <li><a href="/" className="hover:text-gray-200">New Arrivals</a></li>
            <li><a href="/" className="hover:text-gray-200">Sale</a></li>
            <li><a href="/" className="hover:text-gray-200">Customer Service</a></li>
          </ul>
        </div>
        <hr className="my-8 border-gray-700" />
        <div className="flex flex-col items-center">
          <p>© 2009–2024 - Zappos.com LLC or its affiliates</p>
          <div className="mt-4 space-x-4">
            <a href="/" className="hover:text-blue-400">Terms of Use</a>
            <a href="/" className="hover:text-blue-400">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MobileFooter;
