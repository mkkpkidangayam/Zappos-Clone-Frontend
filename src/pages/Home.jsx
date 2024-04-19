import React, { useState, useEffect, useContext } from "react";
import img1 from "../components/Assets/carsoul-img-1.jpg";
import img2 from "../components/Assets/RUNNING-CAMPAIGN-WOMENS-SPORTS-HERO-TABLET-2048x996.jpg";
import img3 from "../components/Assets/SWYA-CROCS-FEBRUARY-HERO-1440x700.jpg";
import myContext from "../context/myContextxt";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import LoadingSpinner from "../components/Assets/LoadingSpinner";

const Home = () => {
  const { product } = useContext(myContext);
  const images = [img1, img2, img3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const rotateImages = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(rotateImages, 5000);

    return () => clearInterval(interval);
  });

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
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

  return (
    <div className="container my-6">
      <div className="flex justify-center">
        <img
          className="h-full w-[95%] object-center"
          src={images[currentImageIndex]}
          alt={`img${currentImageIndex + 1}`}
        />
      </div>
      <div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-2">
          <div className="my-5">
            <h1 className="text-xl text-center font-bold mb-4">
              Shop Popular Shoe Categories
            </h1>
            <h1 className="text-xl text-center font-bold mb-4">
               Shoe
            </h1>
            <hr className="w-24 m-auto border-black" />
            <div className="mx-10">
              <Carousel responsive={responsive}>
                {product ? (
                  product
                  .filter((item) => item.category.main === "shoe")
                  .map((item, index, filteredArray) => {
                    const isDuplicate = filteredArray
                      .slice(0, index)
                      .some(
                        (prevItem) =>
                          prevItem.category.sub === item.category.sub
                      );
                    if (isDuplicate) return null;
                    return (
                      <article key={index} className="w-[95%]  m-5 p-2">
                        <picture>
                          <img
                            src={item.images[0]}
                            alt=""
                            className=" w-full h-auto"
                          />
                        </picture>
                        <div className="text-center">
                          <Link
                            to={`/category/${encodeURIComponent(
                              item.category.sub
                            )}`}
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
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-2">
          <div className="my-5">
            <h1 className="text-xl text-center font-bold mb-4">
              Cloths
            </h1>
            <hr className="w-24 m-auto border-black" />
            <div className="mx-10">
              <Carousel responsive={responsive}>
                {product ? (
                  product
                    .filter((item) => item.category.main === "cloth")
                    .map((item, index, filteredArray) => {
                      const isDuplicate = filteredArray
                        .slice(0, index)
                        .some(
                          (prevItem) =>
                            prevItem.category.sub === item.category.sub
                        );
                      if (isDuplicate) return null;
                      return (
                        <article key={index} className="w-[95%]  m-5 p-2">
                          <picture>
                            <img
                              src={item.images[0]}
                              alt=""
                              className=" w-full h-auto"
                            />
                          </picture>
                          <div className="text-center">
                            <Link
                              to={`/category/${encodeURIComponent(
                                item.category.sub
                              )}`}
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
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-2">
          <div className="my-5">
            <h1 className="text-xl text-center font-bold mb-4">
              Accessories
            </h1>
            <hr className="w-24 m-auto border-black" />
            <div className="mx-10">
              <Carousel responsive={responsive}>
                {product ? (
                  product
                  .filter((item) => item.category.main === "accessories")
                  .map((item, index, filteredArray) => {
                    const isDuplicate = filteredArray
                      .slice(0, index)
                      .some(
                        (prevItem) =>
                          prevItem.category.sub === item.category.sub
                      );
                    if (isDuplicate) return null;
                    return (
                      <article key={index} className="w-[95%]  m-5 p-2">
                        <picture>
                          <img
                            src={item.images[0]}
                            alt=""
                            className=" w-full h-auto"
                          />
                        </picture>
                        <div className="text-center">
                          <Link
                            to={`/category/${encodeURIComponent(
                              item.category.sub
                            )}`}
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
