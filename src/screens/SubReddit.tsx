import React from "react";
import { RouteProps } from "../types";
import { PostRenderer } from "../components";

const SubReddit = ({ route }: { route: RouteProps<"SubReddit"> }) => {
  const { subreddit } = route.params;
  return <PostRenderer subreddit={subreddit} />;
};

export default SubReddit;
