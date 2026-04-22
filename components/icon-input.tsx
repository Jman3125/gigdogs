import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

type FontAwesomeIconName = React.ComponentProps<typeof FontAwesome>["name"];

type IconInputProps = TextInputProps & {
  icon: FontAwesomeIconName;
};

export default function IconInput({ icon, style, ...rest }: IconInputProps) {
  return (
    <View style={[styles.wrapper]}>
      <FontAwesome name={icon} size={18} color={"black"} style={styles.icon} />

      <TextInput
        {...rest}
        style={[styles.input, style]}
        placeholderTextColor={rest.placeholderTextColor || "#999"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  icon: {
    marginHorizontal: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});
