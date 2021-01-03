import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

export const Carousel = ({
  infinite = false,
  autoplay = false,
  autoplaySpeed = 5000,
  arrows = false,
  className = "carousel",
  speed = 500,
  slidesToShow = 1,
  slideToScroll = 1,
  dots = false,
  pauseOnHover = true,
  children,
}) => {
  const settings = {
    infinite,
    autoplay,
    autoplaySpeed,
    arrows,
    className,
    speed,
    slidesToShow,
    slideToScroll,
    dots,
    pauseOnHover,
  };
  return <Slider {...settings}>{children}</Slider>;
};
