import React, { useState, useEffect } from "react";
import img1 from "../components/Assets/carsoul-img-1.jpg";
import img2 from "../components/Assets/RUNNING-CAMPAIGN-WOMENS-SPORTS-HERO-TABLET-2048x996.jpg";
import img3 from "../components/Assets/SWYA-CROCS-FEBRUARY-HERO-1440x700.jpg";

const Home = () => {
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
          className="h-full w-[95%] object-center "
          src={images[currentImageIndex]}
          alt={`img${currentImageIndex + 1}`}
        />
      </div>
    </div>
  );
};

export default Home;
