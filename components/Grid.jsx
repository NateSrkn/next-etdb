import React from "react";
import styled, { css } from "styled-components";

const GRID_SIZES = ["auto", true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const styles = GRID_SIZES.reduce((obj, size) => {
  const key = size;
  if (size === true) {
    obj[key] = {
      flexBasis: 0,
      flexGrow: 1,
      maxWidth: " 100%",
    };
    return obj;
  }

  if (size === "auto") {
    obj[key] = {
      flexBasis: "auto",
      flexGrow: 0,
      maxWidth: "none",
    };
    return obj;
  }
  const width = Math.round((size / 12) * 10e7) / 10e5;
  obj[key] = `${size} 0 ${width}%`;
  return obj;
}, {});

const Component = React.forwardRef(
  ({ component: Wrapper = "div", ...other }, ref) => {
    return <Wrapper {...other} ref={ref} />;
  }
);

const Grid = styled(Component)`
  flex: ${(props) => styles[props.base] || 1};
  ::-webkit-scrollbar {
    display: none;
  }
  ${(props) =>
    props.sm &&
    css`
      @media screen and (max-width: 550px) {
        flex: ${styles[props.sm]};
      }
    `}
  ${(props) =>
    props.md &&
    css`
      @media screen and (max-width: 768px) {
        flex: ${styles[props.md]};
      }
    `}
  ${(props) =>
    props.lg &&
    css`
      @media screen and (max-width: 1024px) {
        flex: ${styles[props.lg]};
      }
    `}
`;

export default Grid;
