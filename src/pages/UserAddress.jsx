import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/Assets/LoadingSpinner";
import { Axios } from "../MainPage";

function AddressesPage() {
  const { userId } = useParams();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [couponMessageType, setCouponMessageType] = useState("");
  const [itemTotal, setItemTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [currentAddress, setCurrentAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    label: "",
    phoneNumber: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiEndpoint = editing
      ? `/user/${userId}/address/${currentAddress._id}`
      : `/user/${userId}/address`;
    const method = editing ? "put" : "post";

    Axios[method](apiEndpoint, currentAddress)
      .then((response) => {
        if (editing) {
          // Update the existing address
          setAddresses(
            addresses.map((addr) =>
              addr._id === currentAddress._id ? response.data : addr
            )
          );
        } else {
          // Add the new address
          setAddresses([...addresses, response.data]);
        }
        // Reset the form and editing state
        setCurrentAddress({
          street: "",
          city: "",
          state: "",
          zipCode: "",
          label: "",
          phoneNumber: "",
        });
        setEditing(false);
        // Select the new or updated address
        if (!editing) {
          setSelectedAddressId(response.data._id);
          localStorage.setItem("selectedAddressId", response.data._id);
        }
      })
      .catch((error) => console.error("Error saving the address:", error));
  };

  useEffect(() => {
    Axios.get(`/user/${userId}/addresses`)
      .then((response) => {
        const fetchedAddresses = response.data;
        setAddresses(fetchedAddresses);
        if (fetchedAddresses.length > 0) {
          const defaultAddressId = fetchedAddresses[0]._id;
          setSelectedAddressId(defaultAddressId);
          localStorage.setItem("selectedAddressId", defaultAddressId);
        }
      })
      .catch((error) => console.error("Error fetching addresses:", error));

    Axios.get(`/get-cart/${userId}`)
      .then((response) => {
        setCartItems(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  }, [userId]);

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
    localStorage.setItem("selectedAddressId", addressId);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentAddress({ ...currentAddress, [name]: value });
  };

  const deleteAddress = (addressId) => {
    Axios.delete(`/user/${userId}/address/${addressId}`)
      .then(() => {
        console.log("Address deleted successfully");
        const updatedAddresses = addresses.filter(
          (item) => item._id !== addressId
        );
        setAddresses(updatedAddresses);
        if (selectedAddressId === addressId && updatedAddresses.length > 0) {
          const newDefaultAddressId = updatedAddresses[0]._id;
          setSelectedAddressId(newDefaultAddressId);
          localStorage.setItem("selectedAddressId", newDefaultAddressId);
        }
      })
      .catch((error) => {
        console.error("Error deleting address:", error);
      });
  };

  useEffect(() => {
    const subtotal = cartItems.reduce((total, item) => {
      return total + (item.product.price || 0) * (item.quantity || 0);
    }, 0);

    const discountAmount = (appliedDiscount / 100) * subtotal;
    const total = subtotal - discountAmount;

    setItemTotal(subtotal);
    setDiscountAmount(discountAmount);
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
      localStorage.setItem("couponCode", couponCode);
    } catch (error) {
      console.error("Failed to apply coupon:", error);
      setCouponMessage(
        error.response?.data.message || "Failed to apply coupon"
      );
      setCouponMessageType("error");
    }
  };

  const placeOrder = async () => {
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
                <button
                  onClick={() => {
                    setCurrentAddress(addr);
                    setEditing(true);
                  }}
                  className="ml-4 text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteAddress(addr._id)}
                  className="ml-4 text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-3/4 mx-auto">
        <h2 className="text-3xl font-semibold my-10">Order Summary</h2>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.product._id} className="flex justify-between">
                  <span>{item.product.name}</span>
                  <span>
                    {item.quantity} x ${item.product.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${itemTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-4">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon code"
                className="border rounded px-4 py-2"
              />
              <button
                onClick={applyCoupon}
                className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
              >
                Apply
              </button>
              {couponMessage && (
                <div
                  className={`mt-2 ${
                    couponMessageType === "success"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {couponMessage}
                </div>
              )}
            </div>
            <button
              onClick={placeOrder}
              className="bg-blue-500 text-white mt-4 px-4 py-2 rounded"
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AddressesPage;
