import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../types";
import { useRedditSubSearch } from "../hooks/";

const Search = () => {
  const [search, setSearch] = React.useState("ios");

  const { data, hasNextPage, fetchNextPage } = useRedditSubSearch({
    term: search,
  });

  const navigation = useNavigation<NavigationProps<"Search">>();

  const renderItem = React.useCallback(
    ({ item }: { item: any }) => (
      <View style={{ marginTop: 20, alignSelf: "center" }}>
        <Text
          style={styles.title}
          onPress={() =>
            navigation.navigate("SubReddit", {
              subreddit: item.data.display_name,
            })
          }
        >
          {item.data.url}
        </Text>
      </View>
    ),
    []
  );
  const keyExtractor = React.useCallback((item: any) => item.data.url, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignSelf: "center", marginTop: 10 }}>
        <TextInput
          style={styles.input}
          placeholder="Search Subreddit"
          onSubmitEditing={(e) => setSearch(e.nativeEvent.text)}
        />
      </View>
      <FlashList
        data={data?.pages}
        contentContainerStyle={{ paddingBottom: 90 }}
        estimatedItemSize={50}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={1.5}
        onEndReached={() => hasNextPage && search.length > 0 && fetchNextPage()}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#343a40" },
  input: {
    height: 45,
    minWidth: 400,
    maxWidth: 600,
    backgroundColor: "#212529",
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 18,
    color: "#fff",
  },
  title: {
    color: "#fff",
    minWidth: 400,
    maxWidth: 500,
    fontSize: 18,
  },
});
