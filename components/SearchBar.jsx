import React, { useState } from "react";
import { fetchJSON } from "../helpers/apiCall";
import { Image } from "./common/Image";
import Link from "next/link";
import styled from "styled-components";
import { truncateString } from "../helpers/helpers";
const Input = styled("input")`
  position: relative;
  border: none;
  padding: 0.5rem 0 0.5rem 0.5rem;
  height: 96%;
  outline: none;
`;

const DropdownWrapper = styled("div")`
  position: absolute;
  z-index: 1;
  top: 99%;
  left: 0;
  width: 100%;
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  background: white;
  max-height: 400px;
  overflow: scroll;
`;

const ResultItem = styled("div")`
  display: flex;

  .result-info {
    padding: 1rem;
  }
`;

export const SearchBar = () => {
  let [query, setQuery] = useState("");
  let [searchData, setSearchData] = useState([]);

  const listenForInput = () => {
    let timeout = null;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (query === "") return setSearchData([]);
      searchQuery(query);
    }, 1000);
  };

  const searchQuery = async (queryText) => {
    const { results } = await fetchJSON("/search/multi", true, {
      query: queryText,
    });
    setSearchData(results);
  };

  const onBlur = () => {
    setQuery("");
    setTimeout(() => {
      setSearchData([]);
    }, 100);
  };

  return (
    <div
      className="search-container"
      style={{
        position: "relative",
        borderLeft: "1px solid black",
        height: "100%",
      }}
    >
      <Input
        type="search"
        id="main-search"
        placeholder="Search Entertainment"
        onChange={({ target }) => setQuery(target.value)}
        onKeyUp={listenForInput}
        onBlur={() => onBlur()}
        value={query}
      />
      {searchData.length > 0 && <Dropdown results={searchData} />}
    </div>
  );
};

const Dropdown = ({ results }) => {
  const displayTitle = (type) => {
    switch (type) {
      case "movie":
        return "Movie";
      case "tv":
        return "Show";
      case "person":
        return "Person";
      default:
        return "";
    }
  };
  return (
    <DropdownWrapper className="dropdown-menu">
      {results.map(({ type, id, name, poster, profile, backdrop }, index) => (
        <div key={id + index} style={{ borderTop: "1px solid black" }}>
          <Link href={`/${type}/${id}`}>
            <ResultItem>
              <Image
                src={poster || profile || backdrop}
                alt={name}
                style={{ width: 100 }}
              />
              <div className="result-info">
                <div>{displayTitle(type)}</div>
                <div>{truncateString(name, 5)}</div>
              </div>
            </ResultItem>
          </Link>
        </div>
      ))}
      {/* {results.map((result, index) => (
        <Link to={`/${result.type}/${result.id}`} key={result.id + index}>
          <div className="drop-item">
            <div className="drop-media">
              <Image small type="poster" src={result.image} alt={result.name} />
            </div>
            <div className="drop-info">
              <div className="sub-title">{displayTitle(result.type)}</div>
              <div>{result.name}</div>
            </div>
          </div>
        </Link>
      ))} */}
    </DropdownWrapper>
  );
};
