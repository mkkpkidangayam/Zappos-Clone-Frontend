import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/Assets/LoadingSpinner";
import { Axios } from "../MainPage";

function AddressesPage() {
  const { userId } = useParams();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isLoding, setIsLoding] = useState(true);
  const [editing, setEditing] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [couponMessageType, setCouponMessageType] = useState("");
  const [itemTotal, setItemTotal] = useState();
  const [total, setTotal] = useState();
  const [discountAmount, setDiscountAmount] = useState();
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [currentAddress, setCurrentAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    label: "",
    phoneNumber: "",
  });

  useEffect(() => {
    Axios.get(`/user/${userId}/addresses`)
      .then((response) => setAddresses(response.data))
      .catch((error) => console.error("Error fetching addresses:", error));

    Axios.get(`/get-cart/${userId}`)
      .then((response) => {
        setCartItems(response.data);
        setIsLoding(false);
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  }, [userId, setCurrentAddress]);

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
    localStorage.setItem("selectedAddressId", addressId);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "label") {
      setCurrentAddress({ ...currentAddress, [name]: value });
    } else {
      setCurrentAddress({ ...currentAddress, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiEndpoint = editing
      ? `/user/${userId}/address/${currentAddress._id}`
      : `/user/${userId}/address`;
    const method = editing ? "put" : "post";

    Axios[method](apiEndpoint, currentAddress)
      .then(() => {
        setAddresses(
          editing
            ? addresses.map((addr) =>
                addr._id === currentAddress._id ? currentAddress : addr
              )
            : [...addresses, currentAddress]
        );
        setCurrentAddress({
          street: "",
          city: "",
          state: "",
          zipCode: "",
          label: "",
          phoneNumber: "",
        });
        setEditing(false);
      })
      .catch((error) => console.error("Error saving the address:", error));
  };
  const deleteAddress = (addressId) => {
    Axios.delete(`/user/${userId}/address/${addressId}`)
      .then((response) => {
        console.log("Address deleted successfully");
        const updatedaddress = addresses.filter(
          (item) => item._id !== addressId
        );
        setAddresses(updatedaddress);
      })
      .catch((error) => {
        console.error("Error deleting address:", error);
      });
  };

  // const calculateTotal = () => {
  //   let total = cartItems.reduce(
  //     (total, item) => total + (item.product.price || 0) * (item.quantity || 0),
  //     0
  //   );
  //   total -= appliedDiscount;
  //   return total;
  // };

  //   const calculateTotal = () => {
  //     // Calculate the subtotal of all items
  //     const subtotal = cartItems.reduce((total, item) => {
  //         return total + (item.product.price || 0) * (item.quantity || 0);
  //     }, 0);
  //     setItemtotal(subtotal)
  //     // Calculate the discount amount
  //     const discountAmount = (appliedDiscount / 100) * subtotal;
  //     setDiscountAmount(discountAmount)

  //     // Subtract the discount from the subtotal to get the total
  //     const total = subtotal - discountAmount;

  //     return total;
  // };

  useEffect(() => {
    const subtotal = cartItems.reduce((total, item) => {
      return total + (item.product.price || 0) * (item.quantity || 0);
    }, 0);

    const discountAmount = (appliedDiscount / 100) * subtotal;
    const total = subtotal - discountAmount;

    setItemTotal(subtotal);
    setDiscountAmount(discountAmount);
    // This assumes you have a state called `total` to store the final value
    setTotal(total);
  }, [cartItems, appliedDiscount]);

  const applyCoupon = async () => {
    try {
      const response = await Axios.post("/apply-coupon", {
        userId,
        couponCode,
      });
      const { message, discount } = response.data;
      setAppliedDiscount(discount);
      setCouponMessage(message);
      setCouponMessageType("success");
      localStorage.setItem("cpo", couponCode)
    } catch (error) {
      console.error("Failed to apply coupon:", error);
      setCouponMessage(
        error.response?.data.message || "Failed to apply coupon"
      );
      setCouponMessageType("error");
    }
  };

  const placeOrder = async (userId) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!selectedAddressId) {
      toast.error("Please select an address");
      return;
    }

    try {
      const result = await Axios.post(
        `/checkout/${userId}`,
        { appliedDiscount },
        { withCredentials: true }
      );
      const paymentLink = result.data;
      window.location.href = paymentLink;
      // window.open(paymentLink, );
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Error placing order. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="w-3/4 mx-auto">
        <h2 className="text-3xl font-semibold my-10">Manage Addresses</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            name="street"
            value={currentAddress.street}
            onChange={handleInputChange}
            placeholder="Street"
            className="block w-full mb-2 px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="city"
            value={currentAddress.city}
            onChange={handleInputChange}
            placeholder="City"
            className="block w-full mb-2 px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="state"
            value={currentAddress.state}
            onChange={handleInputChange}
            placeholder="State"
            className="block w-full mb-2 px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="zipCode"
            value={currentAddress.zipCode}
            onChange={handleInputChange}
            placeholder="Zip Code"
            className="block w-full mb-2 px-4 py-2 border rounded"
          />

          <input
            type="text"
            name="phoneNumber"
            value={currentAddress.phoneNumber}
            onChange={handleInputChange}
            placeholder="Mobile Number"
            className="block w-full mb-4 px-4 py-2 border rounded"
          />

          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="label"
              value="Home"
              checked={currentAddress.label === "Home"}
              onChange={handleInputChange}
              className="mr-2"
            />
            Home
          </label>

          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="label"
              value="Office"
              checked={currentAddress.label === "Office"}
              onChange={handleInputChange}
              className="mr-2"
            />
            Office
          </label>
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white mt-2 px-4 py-2 rounded hover:bg-blue-600"
          >
            {editing ? "Update Address" : "Add Address"}
          </button>
        </form>
        <ul>
          {addresses.map((addr) => (
            <li key={addr._id} className="border-b flex items-center py-4">
              <input
                type="radio"
                id={addr._id}
                name="selectedAddress"
                value={addr._id}
                checked={selectedAddressId === addr._id}
                onChange={() => handleSelectAddress(addr._id)}
                className="mr-2"
              />
              <div>
                <b>{addr.label}</b>
                <br />
                {`${addr.street}, ${addr.city}, ${addr.state}, ${addr.zipCode}`}
              </div>
              <div>
                <b>Mobile Number:</b> {addr.phoneNumber}
              </div>
              <button
                onClick={() => {
                  setCurrentAddress(addr);
                  setEditing(true);
                }}
                className="text-blue-500 mt-2 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  deleteAddress(addr._id);
                }}
                className="text-red-500 ml-2 mt-2 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {isLoding ? (
        <LoadingSpinner />
      ) : (
        <div className="w-3/4 mx-auto">
          <h2 className="text-3xl font-semibold my-10">Bag</h2>
          <hr />
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="border-b py-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="font-medium"> {item.product.title}</p>
                    <p>Color: {item.product.color}</p>
                    <p>Size: {item.size}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div>
                    <p>Price: ₹{item.product.price.toFixed(2)}</p>
                    <p>
                      Total: ₹{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="sticky bottom-10 right-10 flex justify-between items-center ">
            <div className="mt-5">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-2"
              />
              {/* Apply coupon button */}
              <button
                onClick={applyCoupon}
                className="bg-blue-500 text-white px-4 py-2 mx-3 rounded hover:bg-blue-600 mb-4"
              >
                Apply Coupon
              </button>
              <p
                className={`${
                  couponMessageType === "success"
                    ? "text-green-500"
                    : "text-red-500"
                } font-medium`}
              >
                {couponMessage}
              </p>
            </div>
            <div>
              {appliedDiscount ? (
                <div>
                  <span className="text-gray-500">Items: {itemTotal.toFixed(2)}</span>
                  <p className="text-gray-500 ">
                    Promotion: -{discountAmount.toFixed(2)}
                  </p>
                </div>
              ) : null}
              <p className="text-xl text-blue-700 font-semibold border-t my-2">
                Total: <sup>₹</sup>
                {total.toFixed(2)}
              </p>
              <button
                onClick={() => placeOrder(userId)}
                className=" bg-black text-white font-semibold px-4 py-2 rounded hover:bg-blue-600"
              >
                Go to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressesPage;
