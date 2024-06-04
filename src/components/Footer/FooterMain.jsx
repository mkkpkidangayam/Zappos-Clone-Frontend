import React from "react";

const Footer = () => {
  return (
    <div className="container bg-gray-900 mt-10">
      <footer className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-gray-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Explore Zappos</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-200">Brands</a></li>
              <li><a href="/" className="hover:text-gray-200">Clothing</a></li>
              <li><a href="/" className="hover:text-gray-200">The Style Room</a></li>
              <li><a href="/" className="hover:text-gray-200">Eyewear</a></li>
              <li><a href="/" className="hover:text-gray-200">New Arrivals</a></li>
              <li><a href="/" className="hover:text-gray-200">Running</a></li>
              <li><a href="/" className="hover:text-gray-200">Jackets</a></li>
              <li><a href="/" className="hover:text-gray-200">Shoes</a></li>
              <li><a href="/" className="hover:text-gray-200">Watches</a></li>
              <li><a href="/" className="hover:text-gray-200">Zappos Adaptive</a></li>
              <li><a href="/" className="hover:text-gray-200">All Departments</a></li>
            </ul>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-200">FAQs</a></li>
              <li><a href="/" className="hover:text-gray-200">Contact Info</a></li>
              <li><a href="/" className="hover:text-gray-200">¿Ayuda en español?</a></li>
              <li><a href="/" className="hover:text-gray-200">Shipping And Returns Policy</a></li>
              <li><a href="/" className="hover:text-gray-200">About Proposition 65</a></li>
            </ul>
            <h3 className="text-xl font-bold mt-4 mb-4">Fit Info</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-200">Measurement Guide</a></li>
              <li><a href="/" className="hover:text-gray-200">Size Conversion Chart</a></li>
              <li><a href="/" className="hover:text-gray-200">Measure Your Bra Size</a></li>
            </ul>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">About Zappos</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-200">About</a></li>
              <li><a href="/" className="hover:text-gray-200">Zappos ONE</a></li>
              <li><a href="/" className="hover:text-gray-200">Zappos for Good</a></li>
              <li><a href="/" className="hover:text-gray-200">Zappos at Work</a></li>
              <li><a href="/" className="hover:text-gray-200">Get the Zappos Mobile App</a></li>
              <li><a href="/" className="hover:text-gray-200">Amazon Prime Benefits</a></li>
              <li><a href="/" className="hover:text-gray-200">Zappos VIP Benefits</a></li>
              <li><a href="/" className="hover:text-gray-200">Powered by Zappos</a></li>
              <li><a href="/" className="hover:text-gray-200">Coupons</a></li>
              <li><a href="/" className="hover:text-gray-200">Accessibility Statement</a></li>
            </ul>
          </div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Your Voice Matters</h3>
              <a href="/" className="text-blue-400 hover:underline">Take Survey</a>
            </div>
            <p>We'd love to learn more about your shopping experiences on Zappos.com and how we can improve!</p>
            <div className="flex justify-between items-center mt-8">
              <h3 className="text-xl font-bold">Connect With Us</h3>
              <ul className="flex space-x-4">
                <li><a href="https://www.facebook.com/zappos" className="hover:text-blue-400"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="https://www.instagram.com/zappos/" className="hover:text-blue-400"><i className="fab fa-instagram"></i></a></li>
                <li><a href="https://twitter.com/zappos" className="hover:text-blue-400"><i className="fab fa-twitter"></i></a></li>
                <li><a href="https://www.pinterest.com/zappos" className="hover:text-blue-400"><i className="fab fa-pinterest"></i></a></li>
                <li><a href="https://www.youtube.com/user/zappos" className="hover:text-blue-400"><i className="fab fa-youtube"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-700" />
        <div className="flex justify-between items-center">
          <p>© 2009–2024 - Zappos.com LLC or its affiliates</p>
          <p><a href="/" className="hover:text-blue-400">Terms of Use</a> | <a href="/" className="hover:text-blue-400">Privacy Policy</a> | <a href="/c/fur-policy" className="hover:text-blue-400">Fur Policy</a> | <a href="/c/interest-based-ads-policy" className="hover:text-blue-400">Interest-Based Ads</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
