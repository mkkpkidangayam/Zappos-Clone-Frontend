import React from "react";
import img1 from "../components/Assets/carsoul-img-1.jpg";
import img2 from "../components/Assets/RUNNING-CAMPAIGN-WOMENS-SPORTS-HERO-TABLET-2048x996.jpg";
import img3 from "../components/Assets/SWYA-CROCS-FEBRUARY-HERO-1440x700.jpg";

const Home = () => {
  return (
    <div className="container m-5">
      
        <img src={img1} alt="img1" className="h-full w-full object-cover rounded-xl" />
        <img src={img2} alt="img2" className="h-full w-full object-cover rounded-xl" />
        <img src={img3} alt="img3" className="h-full w-full object-cover rounded-xl" />
      
    </div>
  );
};

export default Home;
