import styled from "styled-components";
export const MediaGrid = styled.div`
  display: flex;
  flex-wrap: wrap;

  .backdrop {
    border: 1px solid black;
  }
`;

export const Block = styled.div`
  margin: -1px 0;
  border: 1px solid black;
  @media screen and (max-width: 550px) {
    border-left: 0;
    border-right: 0;
  }
  padding: 2rem;

  ul {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Bundle = styled.div`
  margin-bottom: 1rem;
`;

export const FlexGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > div {
    padding-bottom: 10px;
  }
`;

export const GridGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
