import React, { useState } from "react";
import Link from "next/link";
import { Image } from "../common/Image";

export const MediaCard = ({ data, type, includeRating = false }) => {
  return (
    <Link href={`/${data.type || type}/${data.id}`} passHref>
      <a>
        <div className="media-card">
          <Image
            type="poster"
            src={data.poster}
            alt={data.name}
            style={{ width: "200px" }}
          />

          {includeRating && <div className="rating-bubble">{data.rating}</div>}
        </div>
      </a>
    </Link>
  );
};
