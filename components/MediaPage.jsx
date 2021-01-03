import React from "react";
import Link from "next/link";
import { Image } from "./common/Image";
import { MediaGrid, Block, FlexGroup } from "./styled/LayoutItems";
import Grid from "./Grid";
import { HorizontalList } from "./common/FlexList";
import { MediaCard } from "./cards/MediaCard";
const MediaPage = ({ data, type }) => {
  return (
    <React.Fragment>
      <MediaGrid>
        <Image
          src={data.backdrop}
          type={"backdrop"}
          style={{ flex: "1 100%" }}
        />
        <Grid component={Block} base={9}>
          <h2>{data.name}</h2>
          <span>{data.tagline}</span>
        </Grid>
        <Grid component={Block} base={3} md={12}>
          <FlexGroup>
            <div>
              <h4>Released</h4>
              <span>{data.released}</span>
            </div>
            <div>
              <h4>Rating</h4>
              <span>{data.rating}</span>
            </div>
            <div>
              <h4>Genres</h4>
              <span>{data.genres.map((genre) => genre.name).join(", ")}</span>
            </div>
          </FlexGroup>
        </Grid>
        <Grid component={Block} base={8}>
          <FlexGroup>
            <Grid
              component={Image}
              src={data.poster}
              type={"large_poster"}
              base={6}
            />
            <Grid base={6} style={{ padding: "1rem" }}>
              <div>
                <h4>Overview</h4>
                <span>{data.overview}</span>
              </div>
            </Grid>
          </FlexGroup>
        </Grid>
        {data.credits.cast.length > 0 && (
          <Grid component={Block} base={4}>
            <h4>Cast</h4>
            <ul
              style={{
                listStyle: "none",
                margin: "10px 0 0 0",
                maxHeight: 640,
                overflowX: "scroll",
              }}
            >
              {data.credits.cast.map((row) => (
                <li
                  style={{
                    display: "flex",
                  }}
                >
                  <Link href={`/person/${row.id}`}>
                    <div style={{ display: "flex", cursor: "pointer" }}>
                      <Image
                        src={row.profile_path}
                        style={{ width: 100 }}
                        alt={row.name}
                      />
                      <div style={{ padding: "1rem" }}>
                        <div style={{ fontWeight: 600 }}>{row.name}</div>
                        <div>{row.character}</div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        )}
        {data.similar.length > 0 && (
          <Grid component={Block} base={12} style={{ overflow: "scroll" }}>
            <h4 style={{ marginBottom: "1rem" }}>Similar</h4>
            <HorizontalList
              data={data.similar}
              component={MediaCard}
              isScroll={true}
              includeRating={true}
              type={type}
            />
          </Grid>
        )}
      </MediaGrid>
    </React.Fragment>
  );
};

export default MediaPage;
