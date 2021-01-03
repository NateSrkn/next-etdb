import Link from "next/link";
import React from "react";
import { truncateString } from "../../helpers/helpers";
import FeatureInfo from "../common/DynamicInfo";
import { Image } from "../common/Image";
import Grid from "../Grid";
export const FeatureCard = ({
  data: {
    backdrop,
    poster,
    name,
    type,
    id,
    tagline,
    rating,
    released,
    overview,
  },
  width,
}) => {
  const sections = {
    0: {
      wrapper: { attributes: { className: "group" } },
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
              style: {
                fontSize: "clamp(20px, 2.5vh, 24px)",
                marginBottom: 15,
              },
            },
            value: truncateString(name, width > 1024 ? 7 : 5),
          },
        },
      ],
    },
    1: {
      wrapper: {
        tag: "div",
        attributes: {
          className: "group",
          style: { display: "flex", marginBottom: "1rem" },
        },
      },
      section: [
        {
          title: "Rating",
          html: { tag: "div", attributes: null, value: rating },
          order: 1,
        },
        {
          title: "Released",
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
      wrapper: {},
      section: [
        {
          title: "Overview",
          html: {
            tag: "p",
            attributes: { style: { maxWidth: "400px" } },
            value: truncateString(overview, width > 768 ? 20 : 10),
          },
        },
      ],
    },
  };
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start" }}
    >
      <Grid base={8} md={12}>
        <Image src={backdrop} type="backdrop" />
      </Grid>
      <Grid
        component={"section"}
        className="section"
        base={4}
        md={12}
        // lg={12}
        style={{ padding: "clamp(5px, 10px, 10px)" }}
      >
        <div className="hero">
          <FeatureInfo sections={sections} />
          <Link href={`/${type}/${id}`}>Learn More</Link>
        </div>
      </Grid>
    </div>
  );
};
