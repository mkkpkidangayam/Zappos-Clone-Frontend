import React from 'react';

const FooterSecond = () => {
  return (
    <footer className="bg-gray-100 py-4 text-center text-xs text-gray-500">
      <div className="container mx-auto">
        <ul className="flex justify-center space-x-4">
          <li>
            <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=201909000&amp;ref_=footer_cou" className="hover:text-gray-700">Conditions of Use</a>
          </li>
          <li>
            <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=201909010&amp;ref_=footer_privacy" className="hover:text-gray-700">Privacy Notice</a>
          </li>
          <li>
            <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=202075050&amp;ref_=footer_ca" className="hover:text-gray-700">Interest-Based Ads</a>
          </li>
          <li>
            <span className="icp-nav-link-inner">
              <span className="nav-line-1">Choose a language for shopping.</span>
              <span className="nav-line-2">United States</span>
            </span>
          </li>
        </ul>
        <p className="mt-2">&copy; 1996-2021, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
};

export default FooterSecond;
