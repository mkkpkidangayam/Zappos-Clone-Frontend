import React, { useEffect, useState, useRef } from "react";
import { Axios } from "../../MainPage";

const ScrollingText = ({ text }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const textWidth = textRef.current.scrollWidth;
    const containerWidth = textRef.current.offsetWidth;
    const scrollAmount = textWidth + containerWidth;

    const animateScroll = () => {
      textRef.current.style.transition = `transform ${
        scrollAmount / 100
      }s linear`;
      textRef.current.style.transform = `translateX(-${textWidth}px)`;
    };

    const resetScroll = () => {
      textRef.current.style.transition = "none";
      textRef.current.style.transform = "translateX(100%)";
      setTimeout(animateScroll, 50);
    };

    const scrollInterval = setInterval(resetScroll, scrollAmount * 10);

    animateScroll();

    return () => clearInterval(scrollInterval);
  }, [text]);

  return (
    <div
      className="overflow-hidden whitespace-nowrap"
      style={{ width: "100%" }}
    >
      <div ref={textRef} className="inline-block">
        {text}
      </div>
    </div>
  );
};

const TopBar = () => {
  const [topBarContents, setTopBarContents] = useState([]);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  useEffect(() => {
    Axios.get("/admin/get-contents")
      .then((response) => {
        setTopBarContents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top bar content:", error);
      });
  }, []);

  useEffect(() => {
    if (topBarContents.length > 0) {
      const interval = setInterval(() => {
        setCurrentContentIndex((prevIndex) =>
          prevIndex === topBarContents.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [topBarContents]);

  return (
    <div className="mx-auto relative z-10 bg-[#e7f4ff]">
      <div className="flex justify-center items-center">
        <div className="max-w-full">
          <div className="text-center font-medium text-black py-2 px-4">
            {topBarContents.length > 0 ? (
              <ScrollingText text={topBarContents[currentContentIndex].text} />
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
