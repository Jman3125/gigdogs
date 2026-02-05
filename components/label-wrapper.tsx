import { StyleSheet, View } from "react-native";
import { ThemeText } from "./theme-text";

export default function LabelWrapper({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <View style={styles.container}>
      <ThemeText type="default">{label}</ThemeText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
});
