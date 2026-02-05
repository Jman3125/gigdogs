import { StyleSheet, Text, TextProps } from "react-native";

export type ThemeTextProps = TextProps & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
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
    lineHeight: 50,
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
});
