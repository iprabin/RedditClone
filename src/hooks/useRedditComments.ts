import { useQuery } from "react-query";

const useRedditComments = ({
  id,
  subreddit,
  title,
}: {
  id: string;
  subreddit: string;
  title: string;
}) => {
  return useQuery([subreddit, id, "comment"], async () => {
    const res = await fetch(
      `https://www.reddit.com/r/${subreddit}/comments/${id}/${title}/.json?raw_json=1`
    );
    const result = await res.json();
    return {
      post: result[0].data.children[0],
      comment: result[1].data.children,
    };
  });
};

export default useRedditComments;
