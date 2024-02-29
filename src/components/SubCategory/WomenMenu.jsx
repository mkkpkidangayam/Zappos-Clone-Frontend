import React from 'react';

const WomenMenu = () => {
  return (
    <div className="ki-z absolute top-28  left-24 mt-16 bg-white shadow-2xl border-2  rounded-lg">
      <button type="button" data-close="true" aria-label="Close Women Menu" className="px-4 py-2 text-gray-900 hover:text-white hover:bg-gray-300 rounded-lg">Women</button>
      <div className="wi-z">
        <section>
          <a data-hfsubnav="navWomen=Shoes" aria-expanded="false" className="ni-z oi-z ri-z block p-4 text-gray-900 hover:text-white hover:bg-gray-300" origin="www.zappos.com" href="/">Shoes</a>
          <ul role="none" className="si-z">
            <li data-close="true"><button type="button" aria-label="Close Shoes submenu" className="px-4 py-2 text-gray-900 hover:text-white hover:bg-gray-300 rounded-lg">Close Shoes submenu</button></li>
            <li className="text-base"><a origin="www.zappos.com" href="/womens-shoes" className="block px-4 py-2 text-gray-900 hover:text-white hover:bg-gray-300">All Women's Shoes</a></li>
            <li className="text-base"><a origin="www.zappos.com" href="/women-sneakers-athletic-shoes/CK_XARC81wHAAQHiAgMBAhg.zso?s=isNew/desc/goLiveDate/desc/recentSalesStyle/desc/" className="block px-4 py-2 text-gray-900 hover:text-white hover:bg-gray-300">Sneakers & Athletic</a></li>
            <li className="text-base"><a origin="www.zappos.com" href="/womens-boots" className="block px-4 py-2 text-gray-900 hover:text-white hover:bg-gray-300">Boots & Booties</a></li>
            <li className="text-base"><a origin="www.zappos.com" href="/women-sandals/CK_XARC51wHAAQHiAgMBAhg.zso?s=isNew/desc/goLiveDate/desc/recentSalesStyle/desc/" className="block px-4 py-2 text-gray-900 hover:text-white hover:bg-gray-300">Sandals</a></li>
            {/* Add other list items for Shoes */}
          </ul>
        </section>
        <section>
          <a data-hfsubnav="navWomen=Clothing" aria-expanded="false" className="ni-z oi-z ri-z block p-4 text-gray-900 hover:text-white hover:bg-gray-300" origin="www.zappos.com" href="/">Clothing</a>
          <ul role="none" className="si-z">
            <li data-close="true"><button type="button" aria-label="Close Clothing submenu" className="px-4 py-2 text-gray-900 hover:text-white hover:bg-gray-300 rounded-lg">Close Clothing submenu</button></li>
            <li className="text-base"><a origin="www.zappos.com" href="/womens-clothing" className="block px-4 py-2 text-gray-900 hover:text-white hover:bg-gray-300">All Women's Clothing</a></li>
            <li className="text-base"><a origin="www.zappos.com" href="/dresses" className="block px-4 py-2 text-gray-900 hover:text-white hover:bg-gray-300">Dresses</a></li>
            <li className="text-base"><a origin="www.zappos.com" href="/women-shirts-tops/CKvXARDL1wHAAQHiAgMBAhg.zso?s=isNew/desc/goLiveDate/desc/recentSalesStyle/desc/" className="block px-4 py-2 text-gray-900 hover:text-white hover:bg-gray-300">Shirts & Tops</a></li>
            {/* Add other list items for Clothing */}
          </ul>
        </section>
        {/* Add other sections */}
      </div>
    </div>
  );
}

export default WomenMenu
