//used to populate when nothing comes up after user searches location

import { Image, StyleSheet, View } from "react-native";
import { ThemeText } from "./theme-text";

export default function BlankSearch() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.image}
      />
      <ThemeText type="subtitle" style={styles.text}>
        No results found
      </ThemeText>
      <ThemeText type="default" style={styles.text}>
        GigDogs is a new app with only a few locations so far. Help us expand by
        gettings bands to sign up in your area!
      </ThemeText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    textAlign: "center",
  },
  image: {
    height: 120,
    resizeMode: "contain",
    marginLeft: 15,
  },
});
