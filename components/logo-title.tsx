import { Image, StyleSheet, View } from "react-native";
import { ThemeText } from "./theme-text";

export default function LogoTitle() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />
      <ThemeText type="header" style={styles.text}>
        Gig Dogs
      </ThemeText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  logo: {
    width: 50,
    height: 32,
  },
});
