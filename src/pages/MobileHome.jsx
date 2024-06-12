import React, { useState, useEffect, useContext } from "react";
import img1 from "../components/Assets/Images/download.webp";
import img2 from "../components/Assets/Images/img2.webp";
import img3 from "../components/Assets/Images/img3.webp";
import myContext from "../context/myContextxt";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import LoadingSpinner from "../components/Assets/LoadingSpinner";

const MobileHome = () => {
  const { product, isLoading } = useContext(myContext);
  const images = [img1, img2, img3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("shoe");

  const rotateImages = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(rotateImages, 5000);
    return () => clearInterval(interval);
  }, []);

  const responsive = {
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  const filteredProducts = product
    ? product.filter((item) => item.category.main === selectedCategory)
    : [];

  const renderCarousel = () => (
    <div className="h-full px-2 mx-auto">
      <Carousel responsive={responsive}>
        {filteredProducts ? (
          filteredProducts.map((item, index, filteredArray) => {
            const isDuplicate = filteredArray
              .slice(0, index)
              .some((prevItem) => prevItem.category.sub === item.category.sub);
            if (isDuplicate) return null;
            return (
              <article key={index} className="w-full border p-2">
                <Link
                  to={`/category/${encodeURIComponent(item.category.sub)}`}
                  className="block font-semibold hover:underline"
                >
                  <picture>
                    {item.images ? (
                      <img
                        src={item.images[0]}
                        alt=""
                        className="w-full h-auto"
                      />
                    ) : (
                      <LoadingSpinner />
                    )}
                  </picture>
                </Link>
                <div className="text-center">
                  <Link
                    to={`/category/${encodeURIComponent(item.category.sub)}`}
                    className="block font-semibold hover:underline"
                  >
                    {item.category.sub}
                  </Link>
                </div>
              </article>
            );
          })
        ) : (
          <LoadingSpinner />
        )}
      </Carousel>
    </div>
  );

  return (
    <div className="container my-6">
      <div className="flex justify-center">
        <img
          className="h-full object-center"
          src={images[currentImageIndex]}
          alt={`img${currentImageIndex + 1}`}
        />
      </div>
      <div className="m-2">
        <div className="">
          <h1 className="text-xl text-teal-800 text-center font-bold">
            Shop Popular Categories
          </h1>
        </div>
        <hr className="m-auto w-1/5 border-black" />
        <div className="flex justify-center space-x-2 my-4">
          <button
            className={`py-2 px-3 border rounded-lg font-bold hover:bg-blue-500 ${
              selectedCategory === "shoe"
                ? "bg-blue-600 text-white"
                : "bg-slate-200"
            } `}
            onClick={() => setSelectedCategory("shoe")}
          >
            Shoes
          </button>
          <button
            className={`py-2 px-3 border rounded-lg font-bold hover:bg-blue-500 ${
              selectedCategory === "cloth"
                ? "bg-blue-600 text-white"
                : "bg-slate-200"
            } `}
            onClick={() => setSelectedCategory("cloth")}
          >
            Clothes
          </button>
          <button
            className={`py-2 px-3 border rounded-lg font-bold hover:bg-blue-500 ${
              selectedCategory === "accessories"
                ? "bg-blue-600 text-white"
                : "bg-slate-200"
            } `}
            onClick={() => setSelectedCategory("accessories")}
          >
            Accessories
          </button>
        </div>
        <div>{isLoading ? <LoadingSpinner/> : renderCarousel()}</div>
      </div>

      <div className="cursor-default border mx-2">
        <h1 className="text-center text-7xl text-transparent bg-clip-text font-extrabold bg-cover bg-[url('https://m.media-amazon.com/images/G/01/Zappos/2024/Homepage/4.22/CROCS-STARWARS-AOE-1920x1000._FMwebp_.jpg')]">
          ZAPPOS
        </h1>
      </div>
    </div>
  );
};

export default MobileHome;
