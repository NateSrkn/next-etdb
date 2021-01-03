import React from "react";
import { useRouter } from "next/router";
import { usePerson } from "../../hooks/useQueriesList";
import { Image } from "../../components/common/Image";
import {
  MediaGrid,
  Block,
  FlexGroup,
} from "../../components/styled/LayoutItems";
import Head from "next/head";
import Link from "next/link";
import { truncateString } from "../../helpers/helpers";
import { useWindowSize } from "../../hooks/useWindowSize";
import Grid from "../../components/Grid";
const PersonPage = () => {
  const router = useRouter();

  const { id } = router.query;
  if (!id) {
    return null;
  }

  const { data, isSuccess } = usePerson(id);
  const { width, height } = useWindowSize();
  if (!isSuccess) return null;

  return (
    <React.Fragment>
      <Head>
        <title>{data.name} | People</title>
      </Head>
      <MediaGrid>
        <Grid component={Block} base={9} sm={6}>
          <h2>{data.name}</h2>
        </Grid>
        <Grid component={Block} base={3} sm={6}>
          <FlexGroup>
            <div className="bundle">
              <h4>Born</h4>
              <span>{data.birthday}</span>{" "}
              {data.deathday && <span>- {data.deathday}</span>}
            </div>
            <div className="bundle">
              <h4>Birthplace</h4>
              <span>{data.birthplace}</span>
            </div>
            <div className="bundle">
              <h4>Known For</h4>
              <span>{data.known_for_department}</span>
            </div>
          </FlexGroup>
        </Grid>
        <Grid component={Block} base={8}>
          <FlexGroup>
            <Grid
              component={Image}
              src={data.profile}
              type={"large_poster"}
              base={6}
              lg={12}
            />
            <Grid
              style={{
                padding: width > 768 ? "1rem" : "1rem 0 0 0",
              }}
              base={6}
            >
              {data.overview && (
                <React.Fragment>
                  <h4>Overview</h4>
                  <span>{truncateString(data.overview, 40)}</span>
                </React.Fragment>
              )}
            </Grid>
          </FlexGroup>
        </Grid>
        <Grid component={Block} base={4}>
          <h4>Credits</h4>
          <ul
            style={{
              listStyle: "none",
              margin: "10px 0 0 0",
              maxHeight: 640,
              overflowX: "scroll",
            }}
          >
            {data.combined_credits.cast.map((row) => (
              <li style={{ cursor: "pointer" }}>
                <Link href={`/${row.type}/${row.id}`} passHref>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <Image
                      src={row.poster}
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
      </MediaGrid>
    </React.Fragment>
  );
};

export default PersonPage;
