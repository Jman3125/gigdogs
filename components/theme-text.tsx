//Theme text to be used in project
import { colors } from "@/utilities/colors";

import { StyleSheet, Text, TextProps } from "react-native";

export type ThemeTextProps = TextProps & {
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "error"
    | "logo"
    | "caption";
};

export function ThemeText({
  style,
  type = "default",
  ...rest
}: ThemeTextProps) {
  return <Text style={[styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: { fontSize: 16, lineHeight: 24, fontFamily: "Ubuntu_400Regular" },
  title: {
    fontSize: 45,
    lineHeight: 50,
    fontFamily: "Ubuntu_700Bold",
  },
  subtitle: {
    fontSize: 30,
    lineHeight: 35,
    fontFamily: "Ubuntu_500Medium",
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Ubuntu_500Medium",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
    fontFamily: "Ubuntu_400Regular",
  },
  error: {
    color: colors.error,
    backgroundColor: "#eb2424a9",
    borderRadius: 5,
    padding: 15,
    fontFamily: "Ubuntu_400Regular",
  },
  logo: {
    fontSize: 30,
    lineHeight: 35,
    fontFamily: "DynaPuff_500Medium",
  },
  caption: {
    color: "gray",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Ubuntu_300Light",
  },
});
