import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddressesPage() {
  const { userId } = useParams();
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    label: "",
    phoneNumber: "",
  });
  const [editing, setEditing] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4323/api/user/${userId}/addresses`)
      .then((response) => setAddresses(response.data))
      .catch((error) => console.error("Error fetching addresses:", error));

    axios
      .get(`http://localhost:4323/api/get-cart/${userId}`)
      .then((response) => setCartItems(response.data))
      .catch((error) => console.error("Error fetching cart items:", error));
  }, [userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentAddress({ ...currentAddress, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiEndpoint = editing
      ? `/api/user/${userId}/address/${currentAddress._id}`
      : `/api/user/${userId}/address`;
    const method = editing ? "put" : "post";

    axios[method](apiEndpoint, currentAddress)
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
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.product.price || 0) * (item.quantity || 0),
      0
    );
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="w-3/4 m-auto">
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
          <input
            type="text"
            name="label"
            value={currentAddress.label}
            onChange={handleInputChange}
            placeholder="Label (e.g., Home, Office)"
            className="block w-full mb-2 px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editing ? "Update Address" : "Add Address"}
          </button>
        </form>
        <ul>
          {addresses.map((addr) => (
            <li key={addr._id} className="border-b py-4">
              <div>{`${addr.label}: ${addr.street}, ${addr.city}, ${addr.state}, ${addr.zipCode}, ${addr.country}`}</div>
              <div>Mobile Number: {addr.phoneNumber}</div>
              <button
                onClick={() => {
                  setCurrentAddress(addr);
                  setEditing(true);
                }}
                className="text-blue-500 mt-2"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 mx-auto">
        <h2 className="text-3xl font-semibold my-10">Bag</h2>
        <hr />
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="border-b py-4">
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
        <h2 className="float-right text-2xl font-semibold">
          Total: {calculateTotal().toFixed(2)}
        </h2>
      </div>
    </div>
  );
}

export default AddressesPage;
