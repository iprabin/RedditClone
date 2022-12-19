import { useInfiniteQuery } from "react-query";

const useRedditSubSearch = ({ term }: { term: string }) => {
  return useInfiniteQuery(
    [term, "search"],
    async ({ pageParam = "" }) => {
      let url = `https://www.reddit.com/subreddits/search.json?q=${term}&raw_json=1&count=25`;
      if (pageParam != "") url = url + `&after=${pageParam}`;
      const res = await fetch(url);
      const data = await res.json();
      return data.data;
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.after ?? false;
      },
      retry: 1,
      select: (data) => {
        return {
          pageParams: data.pageParams,
          pages: data.pages.flatMap((e) => e.children),
        };
      },
      keepPreviousData: false,
    }
  );
};

export default useRedditSubSearch;
