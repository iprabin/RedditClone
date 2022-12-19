import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import React from "react";
import useRedditPost from "../hooks/useRedditPost";
import Post from "./Post";
import { FlashList } from "@shopify/flash-list";
import Filter from "./Filter";

const PostRenderer = ({ subreddit }: { subreddit: string }) => {
  const [selected, setSelected] = React.useState<string>("best");
  const [show, setShow] = React.useState(false);
  const [filter, setFilter] = React.useState("today");

  const { data, hasNextPage, fetchNextPage } = useRedditPost({
    subreddit,
    filter: selected,
    timeFilter: filter,
  });

  const renderItem = React.useCallback(
    ({ item }: { item: any }) => <Post {...{ item }} />,
    []
  );
  const keyExtractor = React.useCallback((item: any) => item.data.id, []);

  const getNextPage = () => {
    if (hasNextPage) fetchNextPage();
  };

  const onPress = React.useCallback((text: string) => setSelected(text), []);

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        ListHeaderComponent={
          <>
            <Text style={styles.subreddit}>{subreddit}</Text>
            <Filter
              {...{ selected, onPress, show, setShow, filter, setFilter }}
            />
            <View style={{ marginTop: show ? 40 : undefined }} />
          </>
        }
        contentContainerStyle={styles.contentContainer}
        data={data?.pages ?? []}
        estimatedItemSize={600}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={0.3}
        onEndReached={getNextPage}
      />
    </SafeAreaView>
  );
};

export default PostRenderer;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#343a40" },
  contentContainer: {
    paddingLeft: 90,
    paddingRight: 90,
    paddingBottom: 90,
  },
  subreddit: {
    textTransform: "capitalize",
    color: "#fff",
    fontWeight: "600",
    fontSize: 26,
    minWidth: 400,
    maxWidth: 700,
    alignSelf: "center",
    marginVertical: 10,
    paddingLeft: 10,
  },
});
