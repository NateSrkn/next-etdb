import React from "react";
import { HorizontalList } from "./common/FlexList";
import { MediaCard } from "./cards/MediaCard";
import { useDiscoverList } from "../hooks/useQueriesList";

export const MediaList = ({ type }) => {
  const { data, isSuccess, status } = useDiscoverList(type);
  const headerObj = {
    movie: "Movies",
    tv: "Shows",
  };

  return (
    <div
      className="media-list"
      data-status={status}
      style={{ padding: "1rem" }}
    >
      <h3 className="media-list-header">{headerObj[type]}</h3>

      {isSuccess && (
        <HorizontalList
          data={data.results}
          component={MediaCard}
          isScroll={true}
          includeRating={true}
          type={type}
        />
      )}
    </div>
  );
};
