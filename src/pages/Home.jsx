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
    <div className="container">
      <img
        src={images[currentImageIndex]}
        alt={`img${currentImageIndex + 1}`}
        className="h-full w-full object-center rounded-xl"
      />
    </div>
  );
};

export default Home;
