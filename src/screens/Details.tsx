import React from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import { Post } from "../components";
import { useRedditComments } from "../hooks";

import { RouteProps } from "../types";

interface DetailsProps {
  route: RouteProps<"Details">;
}

const Details = ({ route }: DetailsProps) => {
  const { id, subreddit, title } = route.params;
  const { data, isLoading } = useRedditComments({ title, id, subreddit });

  const createTextNode = (
    t: string,
    margin: number,
    user: string,
    key: string
  ) => (
    <View style={{ marginLeft: margin, marginTop: 10 }} key={key}>
      <Text
        style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {user}
      </Text>
      <Text style={{ color: "#fff", marginTop: 3 }}>{t}</Text>
    </View>
  );

  const createCommentTree = (
    initial: Array<any>,
    final: Array<React.ReactNode>,
    margin = 0
  ) => {
    if (!initial || initial.length == 0) return null;
    initial.forEach((i) => {
      final.push(
        createTextNode(
          i.data.body,
          margin,
          i.data.author,
          i.data.author_fullname + i.data.name
        )
      );
      if (i.data.replies) {
        createCommentTree(i.data.replies.data.children, final, (margin += 10));
      }
    });
    return final;
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isLoading && (
        <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
          <Post item={data?.post} pressable={false} />
          <View style={styles.itemContainer}>
            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "900" }}>
              Comments
            </Text>
            {createCommentTree(data?.comment, [], 0)}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#343a40",
  },
  itemContainer: {
    marginTop: 20,
    alignSelf: "center",
    minWidth: 300,
    maxWidth: 400,
    backgroundColor: "#212529",
    padding: 20,
    borderRadius: 10,
  },
});
