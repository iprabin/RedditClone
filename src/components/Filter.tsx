import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { IconName } from "../types";

const btns: Array<{ label: string; icon: IconName<"Fontisto"> }> = [
  {
    label: "best",
    icon: "rocket",
  },
  {
    label: "hot",
    icon: "fire",
  },
  {
    label: "new",
    icon: "sun",
  },
  {
    label: "top",
    icon: "arrow-up",
  },
];

const filters = ["today", "week", "month", "year", "all"];

const Btn = ({
  text,
  onPress,
  selected,
  icon,
}: {
  text: string;
  onPress: () => void;
  selected: boolean;
  icon?: IconName<"Fontisto">;
}) => {
  return (
    <View
      style={{
        backgroundColor: selected ? "#495057" : undefined,
        paddingHorizontal: 10,
        borderRadius: 15,
        paddingVertical: 5,
        marginLeft: icon == undefined ? 10 : undefined,
      }}
    >
      <TouchableOpacity onPress={onPress} style={styles.btn}>
        {icon && <Fontisto name={icon} size={20} color="#fff" />}
        <Text style={styles.btnTxt}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Filter = ({
  onPress,
  selected,
  show,
  setShow,
  filter,
  setFilter,
}: {
  onPress: (text: string) => void;
  selected: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        {btns.map((i) => (
          <Btn
            key={i.label}
            icon={i.icon}
            onPress={() => onPress(i.label)}
            selected={selected == i.label}
            text={i.label}
          />
        ))}
        {selected == "top" && (
          <Btn
            text={filter}
            onPress={() => setShow((old) => !old)}
            selected={true}
            icon={undefined}
          />
        )}
      </View>

      {show && (
        <View style={styles.filterContainer}>
          {filters.map((i) => (
            <Btn
              key={i}
              text={i}
              onPress={() => {
                setFilter(i);
                setShow(false);
              }}
              selected={filter == i}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    paddingHorizontal: 10,
    maxWidth: 600,
    minHeight: 45,
    maxHeight: 100,
    minWidth: 400,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#212529",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
  },
  subreddit: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "capitalize",
    color: "#fff",
  },
  filterContainer: {
    flexDirection: "row",
    marginLeft: 20,
    position: "absolute",
    zIndex: 100,
    top: 50,
    backgroundColor: "#212529",
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f5f5f5",
  },
  btnTxt: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 18,
    marginLeft: 5,
    textTransform: "capitalize",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
