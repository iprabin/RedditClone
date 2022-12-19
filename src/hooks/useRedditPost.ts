import { useInfiniteQuery } from "react-query";

interface InfiniteProps {
  subreddit: string;
  filter: string;
  timeFilter: string;
}

export const useRedditPost = ({
  subreddit,
  filter,
  timeFilter,
}: InfiniteProps) => {
  return useInfiniteQuery(
    [subreddit, filter, timeFilter, "post"],
    async ({ pageParam = "" }) => {
      let url = `https://www.reddit.com/r/${subreddit}/${filter}/.json?raw_json=1&count=25`;

      if (filter == "top") url += `&sort=top&t=${timeFilter}`;

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
      refetchOnWindowFocus: false,
    }
  );
};

export default useRedditPost;
