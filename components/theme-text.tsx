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
    | "subtitle"
    | "header";
};

export function ThemeText({
  style,
  type = "default",
  ...rest
}: ThemeTextProps) {
  return (
    <Text
      style={[
        style,
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "link" ? styles.link : undefined,
        type === "error" ? styles.error : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "header" ? styles.header : undefined,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  //I really want to make these dynamic
  default: {
    fontSize: 16,
    lineHeight: 24,
  },

  title: {
    fontSize: 45,
    fontWeight: "bold",
    lineHeight: 45,
  },

  subtitle: {
    fontSize: 30,
    fontWeight: "600",
    lineHeight: 35,
  },

  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  error: {
    color: colors.error,
    backgroundColor: "#eb2424a9",
    borderRadius: 5,
    padding: 15,
    fontWeight: 500,
  },
  header: {
    fontWeight: 600,
    fontSize: 30,
    lineHeight: 35,
  },
});
