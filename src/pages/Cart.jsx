import { useState } from "react";
import Modal from "react-modal";

const CartPopup = ({ isOpen, onClose, items, onUpdateCart }) => {
  const [updatedItems, setUpdatedItems] = useState(items);

  // Function to handle quantity change
  const handleQuantityChange = (index, quantity) => {
    const updatedItem = { ...updatedItems[index], quantity };
    const newItems = [...updatedItems.slice(0, index), updatedItem, ...updatedItems.slice(index + 1)];
    setUpdatedItems(newItems);
  };

  // Function to remove item from cart
  const removeItem = (index) => {
    const newItems = [...updatedItems.slice(0, index), ...updatedItems.slice(index + 1)];
    setUpdatedItems(newItems);
  };

  // Function to calculate subtotal
  const calculateSubtotal = () => {
    return updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to handle checkout
  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log("Checkout clicked");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="bg-white p-4 shadow-md rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul>
          {items && updatedItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500">${item.price}</p>
              </div>
              <div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                  className="w-16 h-8 text-center border border-gray-300 rounded-md"
                />
                <button className="text-red-600 ml-2" onClick={() => removeItem(index)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <p className="text-lg font-semibold">Subtotal: ${calculateSubtotal()}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CartPopup;
