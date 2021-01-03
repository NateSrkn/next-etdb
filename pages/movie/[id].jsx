import React from "react";
import { useRouter } from "next/router";
import { useMedia } from "../../hooks/useQueriesList";
import MovieData from "../../components/MediaPage";
import Head from "next/head";
const MoviePage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return null;
  }
  const { data, isSuccess } = useMedia("movie", id);

  if (!isSuccess) return null;
  return (
    <React.Fragment>
      <Head>
        <title>
          {data.name} | {data.type}
        </title>
      </Head>
      <MovieData data={data} type={"movie"} />
    </React.Fragment>
  );
};

export default MoviePage;
