import { fetchJSON } from "../helpers/apiCall";
import { useQuery, useInfiniteQuery } from "react-query";

export const usePerson = (id) => {
  return useQuery(["people", id], () =>
    fetchJSON(`/person/${id}`, true, { append_to_response: "combined_credits" })
  );
};

export const useMedia = (type, id) => {
  return useQuery([type, id], () =>
    fetchJSON(`/${type}/${id}`, true, {
      append_to_response: "credits,similar",
    })
  );
};

export const useCollection = (id) => {
  return useQuery(["collection", id], () =>
    fetchJSON(`/collection/${id}`, true)
  );
};

export const useDiscoverList = (type) => {
  return useQuery(`${type}-discover`, () =>
    fetchJSON(`/discover/${type}`, true)
  );
};

export const useTrendingList = () => {
  return useQuery("trending", () => fetchJSON("/trending/all/week", true));
};

export const useBulkList = (type) => {
  return useInfiniteQuery(
    `${type}-bulk`,
    ({ pageParam }) =>
      fetchJSON(`/discover/${type}`, true, { include_adult: false }, pageParam),
    {
      getNextPageParam: ({ page, total_pages }) => {
        if (page === total_pages) return undefined;
        return page + 1;
      },
    }
  );
};

export const useSearchQuery = () => {
  return useQuery("query", () => fetchJSON(`/search/multi`, true));
};
