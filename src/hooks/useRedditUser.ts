import { useInfiniteQuery } from "react-query";

interface InfiniteProps {
  user: string;
  filter: string;
  timeFilter: string;
}

const useRedditUser = ({ user, filter, timeFilter }: InfiniteProps) => {
  return useInfiniteQuery(
    [user, filter, timeFilter, "user"],
    async ({ pageParam = "" }) => {
      let url = `https://www.reddit.com/user/${user}.json?raw_json=1&count=25`;

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
    }
  );
};

export default useRedditUser;
