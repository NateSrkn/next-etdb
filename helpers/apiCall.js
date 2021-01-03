import axios from "axios";
import { normalizeRes } from "./helpers";

export const fetchJSON = (
  url,
  isNormalized = false,
  params = {},
  pageParam = 1
) => {
  let options = {
    baseURL: "https://api.themoviedb.org/3/",
    url,
    params: {
      api_key: process.env.MOVIE_DB_KEY,
      page: pageParam,
      ...params,
    },
  };
  return axios(options)
    .then((res) => {
      let { data } = res;
      data = isNormalized ? normalizeRes(data) : data;
      return data;
    })
    .catch((err) => {
      return err;
    });
};
