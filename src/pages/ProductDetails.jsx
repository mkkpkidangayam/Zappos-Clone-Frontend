import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import myContext from "../context/myContextxt";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLogin, userData } = useContext(myContext);
  const [productById, setProductById] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4323/api/product/${id}`
        );
        setProductById(response.data);
      } catch (error) {
        toast.error(error.response.data.message);
        console.error(error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const addToCart = async (userId, productId, size, quantity) => {
    try {
      const response = await axios.post(
        "http://localhost:4323/api/add-to-cart",
        { userId, productId, size, quantity }
      );
      console.log("addtocart: ", response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart.");
    }
  };

  const handleSelectSize = (size) => {
    setSelectedSize(size);
    console.log(size);
    const selectedSizeItem = productById.sizes.find(
      (item) => item.size === size
    );
    setSelectedQuantity(selectedSizeItem?.quantity || 1);
    console.log(size);
  };

  const handleAddToCart = () => {
    if (isLogin) {
      if (!selectedSize) {
        toast.error("Please select a size");
        return;
      }

      if (!userData.cart) {
        // If user's cart is empty, initialize it as an empty array
        userData.cart = [];
      }

      const cartItem = userData.cart.find(
        (item) => item._id === productById._id
      );

      if (cartItem) {
        // If the product is already in the cart, increase its quantity
        addToCart(
          userData._id,
          productById._id,
          selectedSize,
          cartItem.quantity + 1
        );
        toast.success("Product quantity increased!");
      } else {
        // If the product is not in the cart, add it to the cart
        addToCart(userData._id, productById._id, selectedSize, 1);
        toast.success("Product added to cart!");
      }
    } else {
      toast.error("Please login to add products to your cart.");
      navigate("/login");
    }
  };

  const addToWishlist = async () => {
    if (!isLogin) {
      toast.error("Please login to add products to your wishlist.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4323/api/add-to-wishlist",
        {
          userId: userData._id,
          productId: productById._id,
        }
      );
      console.log("add to wishlist response: ", response.data);
      toast.success("Product added to wishlist!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to wishlist.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-[#F7F7F7]">
      {productById ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative md:col-span-2 p-2">
            <img
              src={productById.images[0]}
              alt={productById.title}
              className="w-full h-auto mb-4"
            />

            <div className="absolute top-4 right-4 flex justify-center items-center">
              <button
                type="button"
                onClick={addToWishlist}
                className="border rounded-3xl hover:bg-blue-500 "
              >
                <svg
                  className="h-8 w-8 m-2 cursor-pointer rounded-full hover:text-white "
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M23.5143 21.5031C25.1357 20.1174 26.539 18.7679 27.1262 17.8205C28.0184 16.3801 28.6486 14.8035 28.5435 12.7233C28.3578 9.04119 25.5203 6 22.0454 6C18.6268 6 15.9446 10.045 15.9446 10.045C15.9446 10.045 15.9445 10.0447 15.9441 10.0442C15.9438 10.0447 15.9436 10.045 15.9436 10.045C15.9436 10.045 13.2614 6 9.84275 6C6.36787 6 3.53038 9.04119 3.34469 12.7233C3.23963 14.8035 3.8698 16.3801 4.76202 17.8205C6.55297 20.7103 15.9362 27.3396 15.9441 27.3333C15.9473 27.3358 17.4365 26.2865 19.3409 24.8402" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {productById.images.slice(1, 7).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={productById.title}
                  className="w-full h-auto mb-4"
                />
              ))}
            </div>
          </div>
          <div className="md:col-span-1">
            <Link className="text-2xl mb-2 font-semibold hover:underline hover:text-blue-600">
              {productById.brand}
            </Link>
            <h1 className="text-3xl font-semibold mb-4">{productById.title}</h1>

            <p className="text-4xl mb-2 text-blue-600 font-semibold">
              <sup>$</sup>
              {productById.price.toFixed(2)}
            </p>
            {/* <p className="text-lg mb-2">{productById.category.sub}</p> */}
            <p className="text-lg mb-2">{productById.category.sub} for {productById.gender}</p>
            <p className="text-lg mb-2">
              <b>Color:</b> {productById.color}
            </p>
            <div className="">
              <h2 className="text-xl font-semibold mb-2">Available Sizes:</h2>
              <ul className="flex">
                {productById.sizes.map((sizeItem, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectSize(sizeItem.size)}
                    className={`m-2 w-10 h-10 text-center pt-1 font-semibold  rounded-full border-2  hover:border-black ${
                      selectedSize === sizeItem.size &&
                      " text-white bg-blue-600"
                    }`}
                  >
                    {sizeItem.size}
                  </li>
                ))}
              </ul>
            </div>
            {selectedSize && (
              <div className="mb-4">
                <p className="ml-5 text-sm text-red-500">
                  Only {selectedQuantity} left in stock!
                </p>
                {/* <p className="text-lg">Selected Size: {selectedSize}</p> */}
              </div>
            )}
            <button
              onClick={handleAddToCart}
              className="bg-black w-full text-white my-3 font-bold py-2 px-4 rounded-2xl hover:bg-blue-700"
            >
              Add to Bag
            </button>
            <h2 className="text-xl font-semibold mt-5 mb-3">
              Product Information
            </h2>
            <hr className="border-t border-dashed border-black " />
            <ul className="my-4 list-disc pl-5">
              {productById.info.map((info, index) => (
                <li key={index} className="mb-2">
                  {info}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
};

export default ProductDetails;
