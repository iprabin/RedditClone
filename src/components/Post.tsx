import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";
import { timeSince } from "../utils/Time";
import { NavigationProps } from "../types";

const Post = ({
  item,
  pressable = true,
}: {
  item: any;
  pressable?: boolean;
}) => {
  const navigation = useNavigation<NavigationProps<"Home">>();

  let uri = item.data.thumbnail;
  let aspect = 2;
  if (item.data.preview) {
    uri = item.data.preview.images[0].source.url;
    aspect =
      item.data.preview.images[0].source.width /
      item.data.preview.images[0].source.height;
  }

  let videoUri = "";
  if (item.data.secure_media) {
    if (item.data.secure_media.reddit_video) {
      videoUri = item.data.secure_media.reddit_video.fallback_url;

      if (!pressable)
        aspect =
          item.data.secure_media.reddit_video.width /
          item.data.secure_media.reddit_video.height;
    }
  }

  const handleNav = React.useCallback(
    (item: any) =>
      navigation.navigate("Details", {
        id: item.data.id,
        subreddit: item.data.subreddit,
        title: item.data.title.replaceAll(" ", "_"),
      }),
    []
  );

  let iframeData = "";
  if (item.data.secure_media_embed && item.data.secure_media_embed.content) {
    let splits = item.data.secure_media_embed.content.split(" ");
    splits.forEach((e: string) => {
      if (e.includes("src")) {
        iframeData = e.split('"')[1];
      }
    });
  }

  console.log(iframeData);

  return (
    <View
      style={[
        styles.container,
        {
          width: !pressable ? "90%" : undefined,
          maxWidth: pressable ? 600 : 1000,
        },
      ]}
    >
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text
          style={{ color: "#fff", fontSize: 15 }}
          onPress={() =>
            navigation.navigate("SubReddit", {
              subreddit: item.data.subreddit,
            })
          }
        >
          r/{item.data.subreddit}
        </Text>
        <Text style={{ color: "#fff", fontSize: 15 }}> • </Text>
        <Text
          style={{ color: "#fff", fontSize: 15 }}
          onPress={() =>
            navigation.navigate("User", {
              user: item.data.author,
            })
          }
        >
          u/{item.data.author}
        </Text>
        <Text style={{ color: "#fff", fontSize: 15 }}>
          {" "}
          {timeSince(item.data.created_utc)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => pressable && handleNav(item)}
        activeOpacity={pressable ? 0.6 : 1}
      >
        <>
          <Text style={styles.title} ellipsizeMode={"tail"} numberOfLines={2}>
            {item.data.title}
          </Text>
          <Text style={{ color: "#fff" }}>{item.data.selftext}</Text>
          {(videoUri == "" || pressable) && uri != "" && iframeData == "" && (
            <View style={{ position: "relative" }}>
              <Image
                source={{
                  uri: encodeURI(uri),
                }}
                style={[
                  styles.image,
                  { aspectRatio: aspect, maxHeight: pressable ? 500 : 700 },
                ]}
              />
              {videoUri != "" && (
                <View style={styles.playBtn}>
                  <Entypo name="controller-play" size={90} color="#fff" />
                </View>
              )}
            </View>
          )}
          {videoUri != "" && !pressable && (
            <Video
              source={{
                uri: videoUri,
              }}
              useNativeControls
              isLooping
              isMuted
              shouldPlay
              resizeMode={ResizeMode.CONTAIN}
              videoStyle={{
                aspectRatio: aspect,
                width: "100%",
                maxHeight: 700,
              }}
              style={{
                aspectRatio: aspect,
                width: "100%",
                maxHeight: 700,
              }}
            />
          )}

          {iframeData != "" && (
            <iframe
              style={{ minWidth: 400, maxWidth: 600, aspectRatio: 1.5 }}
              src={iframeData}
              allowFullScreen
            ></iframe>
          )}
        </>
      </TouchableOpacity>
      {item.data.url && (
        <Text
          style={{ color: "#fff" }}
          onPress={() => Linking.openURL(item.data.url)}
        >
          {item.data.url}
        </Text>
      )}
    </View>
  );
};

export default React.memo(Post);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignSelf: "center",
    minWidth: 400,
    backgroundColor: "#212529",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 17,
    marginBottom: 10,
    color: "#fff",
  },
  image: {
    width: "100%",
    // maxHeight: 500,
    resizeMode: "contain",
    alignSelf: "flex-start",
  },
  playBtn: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    height: "100%",
  },
});
