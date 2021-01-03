import React from "react";
import { useRouter } from "next/router";
import ShowData from "../../components/MediaPage";
import { useMedia } from "../../hooks/useQueriesList";

const ShowPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isSuccess } = useMedia("tv", id);
  if (!isSuccess) return null;
  return (
    <React.Fragment>
      <ShowData data={data} type={"tv"} />
    </React.Fragment>
  );
};

export default ShowPage;
