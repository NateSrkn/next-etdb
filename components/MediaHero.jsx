import React, { useState } from "react";
import { Backdrop } from "./common/Backdrop";
import { Image } from "./common/Image";
import MediaInfo from "./common/DynamicInfo";
export const MediaHero = ({
  data: {
    backdrop,
    poster,
    name,
    tagline,
    rating,
    released,
    genres,
    overview,
    seasons,
    last_episode,
    next_episode,
    creators,
    collection,
  },
}) => {
  const [colors, setColors] = useState([]);
  const sections = {
    0: {
      wrapper: {
        attributes: {
          className: "group",
          style: { display: "inline-flex", flexDirection: "column" },
        },
      },
      section: [
        {
          title: null,
          html: {
            tag: "h6",
            attributes: {
              className: "sub-title",
            },
            value: tagline,
          },
        },
        {
          title: null,
          html: {
            tag: "h2",
            attributes: {
              className: "media-title",
            },
            value: name,
          },
        },
      ],
    },
    1: {
      wrapper: {
        tag: "div",
        attributes: { className: "group" },
      },
      section: [
        {
          title: "Rating",
          html: { tag: "div", attributes: null, value: rating },
          order: 1,
        },
        {
          title: "Release Date",
          html: {
            tag: "time",
            attributes: { dateTime: released },
            value: released,
          },
          order: 2,
        },
      ],
    },
    2: {
      wrapper: { attributes: { className: "group" } },
      section: [
        {
          title: "Genre(s)",
          html: {
            tag: "div",
            attributes: null,
            value: genres && genres.map((row) => row.name).join(", "),
          },
        },
      ],
    },
    3: {
      wrapper: {},
      section: [
        {
          title: "Overview",
          html: {
            tag: "p",
            attributes: null,
            value: overview,
          },
        },
      ],
    },
    4: {
      wrapper: {
        tag: "div",
        attributes: { className: "group", style: { display: "inline-flex" } },
      },
      section: [
        {
          title: "Seasons",
          html: {
            tag: "div",
            attributes: null,
            value: seasons,
          },
          key: "length",
          order: 1,
        },
        {
          title: "Last Episode",
          html: {
            tag: "time",
            attributes: { dateTime: last_episode && last_episode.air_date },
            value: last_episode,
          },
          key: "air_date",
          order: 2,
        },
        {
          title: "Next Episode",
          html: {
            tag: "time",
            attributes: { dateTime: next_episode && next_episode.air_date },
            value: next_episode,
          },
          key: "air_date",
          order: 3,
        },
      ],
    },
    5: {
      wrapper: { attributes: { className: "group" } },
      section: [
        {
          title: "Created By",
          html: {
            tag: "div",
            attributes: null,
            value:
              creators && creators.map((creator) => creator.name).join(", "),
          },
        },
      ],
    },
    6: {
      wrapper: { attributes: { className: "group" } },
      section: [
        {
          title: null,
          html: { tag: "button", attributes: null, value: collection },
          key: "name",
        },
      ],
    },
  };

  return (
    <Backdrop backdrop={backdrop}>
      <section className="hero-section">
        {/* <div className="hero-media">
          <Image
            src={poster}
            alt={name}
            type="large_poster"
            hero
            onLoad={setColors}
          />
        </div> */}
        <div className="hero-info">
          <MediaInfo sections={sections} />
        </div>
      </section>
    </Backdrop>
  );
};
