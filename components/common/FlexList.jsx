import React from "react";
import styled, { css } from "styled-components";

const List = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  ${(props) =>
    props.isScroll &&
    css`
      flex-wrap: nowrap;
      scroll-behavior: smooth;
      scroll-snap-type: x mandatory;
      overflow-x: scroll;
      ::-webkit-scrollbar {
        background: none;
        height: 10px;
      }
      ::-webkit-scrollbar-thumb {
        background: transparent;
        opacity: 0;
        border-radius: 10px;
      }
      &:hover {
        ::-webkit-scrollbar-thumb {
          transition: background 0.5s ease;
          background: grey;
        }
      }

      > * {
        scroll-snap-align: start;
        :not(:last-child) {
          margin: 0.5rem 1rem 0.5rem 0;
        }
      }
    `}
`;

export const HorizontalList = ({
  data,
  component: Component,
  isScroll = false,
  ...props
}) => {
  return (
    <List isScroll={isScroll}>
      {data.map((row, index) => (
        <Component data={row} {...props} key={row.id + index} />
      ))}
    </List>
  );
};
