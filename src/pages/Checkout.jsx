import React from "react";

const Checkout = () => {
  return (
    <div className="container mx-auto px-4">
      jhg
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {/* <div className="shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-medium mb-4">Express Checkout</h2>
          <div className="flex justify-center mb-4">
            <div
              className="amazonpay-button-parent-container-checkout-AH437ZNFBII9L"
              id="AmazonPayExpressSectionButton"
            ></div>
          </div>
          <div id="PaypalExpressSectionButton" className="mb-4"></div>
          <p className="text-center">or</p>
        </div> */}
        <div className="shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-medium mb-4">Shipping Address</h2>
          <form action="/address" method="POST">
            <div className="mb-4">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                autoComplete="name"
                autoCorrect="off"
                maxLength="50"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                placeholder="Enter Full Name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="shippingAddress" className="block">
                Shipping Address
              </label>
              <input
                type="text"
                id="shippingAddress"
                name="shippingAddress"
                autoComplete="shipping street-address"
                autoCorrect="off"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                placeholder="Enter Shipping Address"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="shippingCity" className="block">
                City
              </label>
              <input
                type="text"
                id="shippingCity"
                name="shippingCity"
                autoComplete="shipping address-level2"
                autoCorrect="off"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                placeholder="Enter City"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="shippingState" className="block">
                State
              </label>
              <input
                type="text"
                id="shippingState"
                name="shippingState"
                autoComplete="shipping address-level1"
                autoCorrect="off"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                placeholder="Enter State"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="shippingZip" className="block">
                ZIP Code
              </label>
              <input
                type="text"
                id="shippingZip"
                name="shippingZip"
                autoComplete="shipping postal-code"
                autoCorrect="off"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                placeholder="Enter ZIP Code"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="shippingCountry" className="block">
                Country
              </label>
              <select
                id="shippingCountry"
                name="shippingCountry"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Country</option>
                {/* Add options for countries here */}
              </select>
            </div>
          </form>
          <form action="/address" method="POST" className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
        {/* <div className="shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-medium mb-4">Shipping Options</h2>
          {/* Shipping options content */}
        {/* </div> */}

        <div className="mt-8 shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-medium mb-4">Payment Method</h2>
          <div className="mb-4">
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                autoComplete="cc-number"
                autoCorrect="off"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                placeholder="Enter Card Number"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="expiryDate" className="block">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                autoComplete="cc-exp"
                autoCorrect="off"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cvv" className="block">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                autoComplete="cc-csc"
                autoCorrect="off"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                placeholder="Enter CVV"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cardHolderName" className="block">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardHolderName"
                name="cardHolderName"
                autoComplete="cc-name"
                autoCorrect="off"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                placeholder="Enter Cardholder Name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="billingAddress" className="block">
                Billing Address
              </label>
              <input
                type="text"
                id="billingAddress"
                name="billingAddress"
                autoComplete="billing street-address"
                autoCorrect="off"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                placeholder="Enter Billing Address"
                required
              />
            </div>
          </div>
          <h4>Payment</h4>
          <p>Please add or select a shipping address to proceed.</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
