import { StyleSheet, View } from "react-native";
import { ThemeText } from "./theme-text";

export function LabelWrapper({
  label,
  children,
  footnote,
}: {
  label: string;
  footnote?: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <View style={styles.container}>
      <ThemeText type="default">{label}</ThemeText>
      {children}
      {footnote ? (
        <ThemeText type="default" style={styles.footnote}>
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
