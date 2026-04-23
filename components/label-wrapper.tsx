//Wrap a child element with a header and optional footer. Used on input fields for example.
import { StyleSheet, View } from "react-native";
import { ThemeText } from "./theme-text";

export function LabelWrapper({
  label,
  children,
  footnote,
  color,
  isBold,
}: {
  label: string;
  footnote?: string;
  isBold?: boolean;
  color?: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <View style={styles.container}>
      <ThemeText
        type={isBold ? "defaultSemiBold" : "default"}
        style={{ color: color }}
      >
        {label}
      </ThemeText>
      {children}
      {footnote ? (
        <ThemeText type="caption" style={styles.footnote}>
          {footnote}
        </ThemeText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  footnote: {
    color: "gray",
  },
});
