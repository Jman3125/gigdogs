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
        <View style={styles.noSearchContainer}>
          <ThemeText type="logoMedium" style={styles.textHeader}>
            Get Started
          </ThemeText>

          <View style={styles.point}>
            <ThemeText type="logo" style={{ color: "white" }}>
              1.
            </ThemeText>
            <ThemeText type="defaultSemiBold" style={{ color: "white" }}>
              Enter a state and tap the search button to explore venues and
              offers
            </ThemeText>
          </View>
          <View style={styles.point}>
            <ThemeText type="logo" style={{ color: "white" }}>
              2.
            </ThemeText>
            <ThemeText type="defaultSemiBold" style={{ color: "white" }}>
              Create an account in the + tab to start booking as an artist or
              venue
            </ThemeText>
          </View>
        </View>
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
  textHeader: {
    textAlign: "center",
    color: "white",
  },
  noSearchContainer: {
    gap: 10,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 15,
    width: "100%",
  },

  point: {
    padding: 10,
    width: "90%",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
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
