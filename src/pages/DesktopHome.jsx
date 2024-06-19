import React, { useState, useEffect, useContext } from "react";
import img1 from "../components/Assets/carsoul-img-1.jpg";
import img2 from "../components/Assets/RUNNING-CAMPAIGN-WOMENS-SPORTS-HERO-TABLET-2048x996.jpg";
import img3 from "../components/Assets/SWYA-CROCS-FEBRUARY-HERO-1440x700.jpg";
import myContext from "../context/myContextxt";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import LoadingSpinner from "../components/Assets/LoadingSpinner";

const DesktopHome = () => {
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
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 2560 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 2560, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
    },
  };

  const filteredProducts = product
    ? product.filter((item) => item.category.main === selectedCategory)
    : [];

  const renderCarousel = () => (
    <div className="h-full p-6 ">
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
                >
                  <picture>
                    {item.images ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
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
          className="h-full object-cover max-w-full px-4"
          src={images[currentImageIndex]}
          alt={`img${currentImageIndex + 1}`}
        />
      </div>
      <div className="m-5 border">
        <div className="m-4">
          <h1 className="text-3xl text-center font-bold">
            Shop Popular Categories
          </h1>
        </div>
        <hr className="m-auto w-1/5 border-black" />
        <div className="flex justify-center space-x-4 my-4">
          <button
            className={`py-2 px-4 border rounded-lg font-bold hover:bg-blue-500 ${
              selectedCategory === "shoe"
                ? "bg-blue-600 text-white"
                : "bg-slate-200"
            } `}
            onClick={() => setSelectedCategory("shoe")}
          >
            Shoes
          </button>
          <button
            className={`py-2 px-4 border rounded-lg font-bold hover:bg-blue-500 ${
              selectedCategory === "cloth"
                ? "bg-blue-600 text-white"
                : "bg-slate-200"
            } `}
            onClick={() => setSelectedCategory("cloth")}
          >
            Clothes
          </button>
          <button
            className={`py-2 px-4 border rounded-lg font-bold hover:bg-blue-500 ${
              selectedCategory === "accessories"
                ? "bg-blue-600 text-white"
                : "bg-slate-200"
            } `}
            onClick={() => setSelectedCategory("accessories")}
          >
            Accessories
          </button>
        </div>
        <div>{isLoading ? <LoadingSpinner /> : renderCarousel()}</div>
      </div>

      <div className="cursor-default border mx-5">
        <h1 className="text-center sm:text-[100px] md:text-[150px] lg:text-[230px] xl:text-[250px] text-transparent bg-clip-text font-extrabold bg-cover bg-[url('https://m.media-amazon.com/images/G/01/Zappos/2024/Homepage/4.22/CROCS-STARWARS-AOE-1920x1000._FMwebp_.jpg')]">
          ZAPPOS
        </h1>
      </div>
    </div>
  );
};

export default DesktopHome;
