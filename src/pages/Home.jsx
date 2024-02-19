import React from "react";
import { Carousel } from "@material-tailwind/react";
import img1 from "../components/Assets/carsoul-img-1.jpg";
import img2 from "../components/Assets/RUNNING-CAMPAIGN-WOMENS-SPORTS-HERO-TABLET-2048x996.jpg";
import img3 from "../components/Assets/SWYA-CROCS-FEBRUARY-HERO-1440x700.jpg";

const Home = () => {
  return (
    <div className="container">
      <Carousel
        className="rounded-xl"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        <img src={img1} alt="img1" className="h-full w-full object-cover rounded-xl" />
        <img src={img2} alt="img2" className="h-full w-full object-cover rounded-xl" />
        <img src={img3} alt="img3" className="h-full w-full object-cover rounded-xl" />
      </Carousel>
    </div>
  );
};

export default Home;
