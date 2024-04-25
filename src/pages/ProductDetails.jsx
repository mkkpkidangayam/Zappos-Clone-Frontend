import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import myContext from "../context/myContextxt";
import LoadingSpinner from "../components/Assets/LoadingSpinner";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLogin, userData } = useContext(myContext);
  const [productById, setProductById] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4323/api/product/${id}`
        );

        const product = response.data;
        if (
          product.sizes.length === 1 &&
          product.sizes[0].size === "One size"
        ) {
          setSelectedSize("One size");
          setSelectedQuantity(product.sizes[0].quantity);
        }

        setProductById(product);

      } catch (error) {
        toast.error("Failed to fetch product details");
        console.error(error);
      }
    };

    fetchProductDetails();
  }, [id, isLogin, userData.wishlist]);

  const addToCart = async (userId, productId, size, quantity) => {
    try {
      await axios.post("http://localhost:4323/api/add-to-cart", {
        userId,
        productId,
        size,
        quantity,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart.");
    }
  };

  const handleSelectSize = (size) => {
    setSelectedSize(size);
    const selectedSizeItem = productById.sizes.find(
      (item) => item.size === size
    );
    setSelectedQuantity(selectedSizeItem?.quantity);
  };

  const handleAddToCart = () => {
    if (!isLogin) {
      toast.error("Please login to add products to your cart.");
      navigate("/login");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    if (!userData.cart) {
      userData.cart = [];
    }

    const existingCartItem = userData.cart.find(
      (item) => item._id === productById._id && item.size === selectedSize
    );

    const availableStock =
      productById.sizes.find((sizeItem) => sizeItem.size === selectedSize)
        ?.quantity || 0;

    if (existingCartItem) {
      const totalQuantity = existingCartItem.quantity + 1;
      if (totalQuantity > 4 || totalQuantity > availableStock) {
        toast.error(
          "You cannot add more than 4 units of the same item and size."
        );
        return;
      }
      addToCart(userData._id, productById._id, selectedSize, totalQuantity);
      toast.success("Product quantity increased!");
    } else {
      if (availableStock < 1) {
        toast.error("Sorry, this size is currently out of stock.");
        return;
      }
      addToCart(userData._id, productById._id, selectedSize, 1);
      toast.success("Product added to cart!");
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

      if (response.data.success) {
        setIsInWishlist(true);
        toast.success(response.data.message);
      } else {
        setIsInWishlist(false);
        toast.success(response.data.message);
      }
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
                className={`border rounded-3xl border-blue-400 hover:border-4 ${ 
                  isInWishlist && "bg-blue-500 text-white"
                }`}
              >
                <svg
                  className="h-8 w-8 m-2 cursor-pointer rounded-full  "
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
              <sup>₹</sup>
              {productById.price.toFixed(2)}
            </p>
            <p className="text-lg mb-2">
              {productById.category.sub} for {productById.gender.toUpperCase()}
            </p>
            <p className="text-lg mb-2">
              <b>Color:</b> {productById.color}
            </p>

            {productById.sizes.length > 1 ||
            (productById.sizes.length === 1 &&
              productById.sizes[0].size !== "One size") ? (
              <div>
                <h2 className="text-xl font-semibold mb-2">Available Sizes:</h2>
                <ul className="flex">
                  {productById.sizes.map((sizeItem, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectSize(sizeItem.size)}
                      className={`m-2 px-3 h-10 text-center pt-1 font-semibold rounded-full border-2 hover:border-black ${
                        selectedSize === sizeItem.size &&
                        "text-white bg-blue-600"
                      }`}
                    >
                      {sizeItem.size}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {selectedSize && selectedQuantity < 5 && (
              <div className="mb-4">
                {selectedQuantity !== 0 ? (
                  <p className="ml-1 text-sm font-medium text-red-500">
                    Only {selectedQuantity} left in stock!
                  </p>
                ) : (
                  <p className="ml-1 text-sm font-medium text-red-500">
                    Item out of stock!
                  </p>
                )}
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
        <LoadingSpinner />
      )}
    </div>
  );
};

export default ProductDetails;
