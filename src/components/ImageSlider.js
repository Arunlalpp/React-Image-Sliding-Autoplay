import React from "react";
import { useState, useRef, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const featuredProducts = [
  "/images/hero_1.jpg",
  "/images/hero_2.jpg",
  "/images/hero_3.jpg",
  "/images/hero_4.jpg",
  "/images/hero_5.jpg",
];
let count = 0;
let slideInterval;
export default function ImageSlider() {
  const [current, setCurrent] = useState(false);

  const slideRef = useRef();

  const removeAnimation = () => {
    slideRef.current.classList.remove("fade-anim");
  };

  useEffect(() => {
    slideRef.current.addEventListener("animationend", removeAnimation);
    slideRef.current.addEventListener("mouseenter", pauseSlider);
    slideRef.current.addEventListener("mouseleave", startSlider);

    startSlider();
    return () => {
      pauseSlider();
    };
  }, [ ]);
  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 3000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % featuredProducts.length;
    setCurrent(count);
    slideRef.current.classList.add("fade-anim");
  };
  const handleOnPrevClick = () => {
    const productsLength = featuredProducts.length;
    count = (current + productsLength - 1) % productsLength;
    setCurrent(count);
    slideRef.current.classList.add("fade-anim");
  };

  return (
    <section ref={slideRef} className="slider">
      <div>
        <img src={featuredProducts[current]} alt='travel' className="image" />
      </div>
      <FaArrowAltCircleLeft
        className="left-arrow"
        
        onClick={handleOnPrevClick}
      />
      <FaArrowAltCircleRight
        className="right-arrow"
        onClick={handleOnNextClick}
      />
    </section>
  );
}
