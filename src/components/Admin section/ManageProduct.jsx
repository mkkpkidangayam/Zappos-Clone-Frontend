import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import myContext from "../context/myContextxt";
import LoadingSpinner from "../components/Assets/LoadingSpinner";
import { Axios } from "../MainPage";

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
        const response = await Axios.get(`/product/${id}`);

        const product = response.data;

        setProductById(product);
      } catch (error) {
        toast.error("Failed to fetch product details");
        console.error(error);
      }
    };

    fetchProductDetails();
  }, [id, userData?.wishlist]);

 
  return (
    <div className="container mx-auto px-4 py-8 bg-[#fff9f9]">
      {productById ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative md:col-span-2 p-2">
            <img
              src={productById.images[0]}
              alt={productById.title}
              className="w-full h-auto mb-4 object-cover mix-blend-darken"
            />

          
            <div className="grid grid-cols-2 gap-3">
              {productById.images.slice(1, 7).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={productById.title}
                  className="w-full h-auto mb-4 object-cover mix-blend-darken"
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
              className="bg-black w-full text-white my-3 font-bold py-2 px-4 rounded-2xl hover:bg-blue-700"
            >
              Edit
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
