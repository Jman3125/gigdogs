//used to populate when nothing comes up after user searches location

import { colors } from "@/utilities/colors";
import { Image, StyleSheet, View } from "react-native";
import { ThemeText } from "./theme-text";

type Props = {
  noneSelected: boolean;
};

export default function BlankSearch({ noneSelected }: Props) {
  return (
    <View style={styles.container}>
      {!noneSelected && (
        <>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.image}
          />
          <ThemeText type="subtitle" style={styles.text}>
            No results found
          </ThemeText>
          <ThemeText type="default" style={styles.text}>
            GigDogs is a new app with only a few locations so far. Help us
            expand by telling your friends!
          </ThemeText>
        </>
      )}
      {noneSelected && (
        <>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.image}
          />
          <ThemeText type="subtitle" style={styles.text}>
            Let's Search
          </ThemeText>
          <ThemeText type="default" style={styles.text}>
            Select a state from the drop-down menu to see venues looking for
            live artists near you.
          </ThemeText>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  text: {
    marginTop: 10,
    textAlign: "center",
  },
  image: {
    height: 120,
    resizeMode: "contain",
    marginLeft: 15,
    // iOS
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,

    // Android
    elevation: 6,
  },
});
