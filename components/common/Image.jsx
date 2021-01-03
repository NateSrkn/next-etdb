import React from "react";
import styled from "styled-components";

const Component = React.forwardRef(
  ({ src, alt, type = "poster", ...props }, ref) => {
    const { newSrc } = determineSrc(src, alt, type);
    if (!src & (type === "backdrop")) return null;

    return (
      <div {...props} className={`image-wrapper ${type}`} ref={ref}>
        <img src={newSrc} style={{ display: "inherit" }} />
      </div>
    );
  }
);

export const Image = styled(Component)`
  height: auto;

  img {
    max-height: 100%;
    max-width: 100%;
  }
`;

const determineSrc = (src, alt, type) => {
  const sizes = {
    poster: {
      pathname: "_face",
      height: 330,
      width: 220,
    },
    large_poster: {
      pathname: "_face",
      height: 660,
      width: 440,
    },
    backdrop: {
      pathname: "_multi_faces",
      height: 800,
      width: 1920,
    },
    logo: {
      pathname: "face",
      height: 60,
      width: 60,
    },
  };
  const { height, width, pathname } = sizes[type];
  if (!src) {
    return {
      newSrc: `https://via.placeholder.com/${width}x${height}.png?text=${alt}`,
      height,
      width,
    };
  }

  let newSrc;
  if (src) {
    const path = `w${width}_and_h${height}${pathname}`;
    newSrc = `https://image.tmdb.org/t/p/${path}${src}`;
  } else {
    newSrc = `https://via.placeholder.com/${width}x${height}.png?text=${alt}`;
  }

  return {
    newSrc,
    height,
    width,
  };
};
