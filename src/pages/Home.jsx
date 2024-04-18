import React, { useState, useEffect, useContext } from "react";
import img1 from "../components/Assets/carsoul-img-1.jpg";
import img2 from "../components/Assets/RUNNING-CAMPAIGN-WOMENS-SPORTS-HERO-TABLET-2048x996.jpg";
import img3 from "../components/Assets/SWYA-CROCS-FEBRUARY-HERO-1440x700.jpg";
import myContext from "../context/myContextxt";
import { Link } from "react-router-dom";

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
              Shop Popular Categories
            </h1>
            <div className="flex flex-wrap justify-center mx-auto">
              {product &&
                product.map((item, index) => {
                  // Check if the current category has already been displayed
                  const isDuplicate = product
                    .slice(0, index)
                    .some(
                      (prevItem) => prevItem.category.sub === item.category.sub
                    );
                  if (isDuplicate) return null; // Skip rendering if it's a duplicate

                  return (
                    <article
                      key={index}
                      className="w-full border m-1 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                    >
                      <picture>
                        <img
                          src={item.images[0]}
                          alt=""
                          className="mba-z w-full h-auto"
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
                })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
