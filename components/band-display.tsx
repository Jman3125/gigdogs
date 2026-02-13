//Show band profile on feed page
import { colors } from "@/utilities/colors";
import { Link } from "expo-router";
import { Image, Linking, Pressable, StyleSheet, View } from "react-native";
import { ThemeText } from "./theme-text";

type Props = {
  id: string;
  picture: string;
  name: string;
  genre: string;
  minPrice: number;
  location: string;
};

export function BandDisplay({
  id,
  name,
  genre,
  minPrice,
  picture,
  location,
}: Props) {
  //User wants to report content
  const handleEmail = () => {
    Linking.openURL(
      `mailto:gigdogscontact@gmail.com?subject=Report&Inquiry&body=Please give the account name and problem so we can review it as soon as possible.`,
    );
  };
  return (
    <View style={styles.container}>
      <ThemeText type="default">{location}</ThemeText>
      <ThemeText type="subtitle">{name}</ThemeText>

      <View style={styles.infoContainer}>
        <View style={styles.left}>
          <ThemeText type="defaultSemiBold">Genre: {genre}</ThemeText>
          <ThemeText type="defaultSemiBold">
            Price Per Hour: ${minPrice}
          </ThemeText>

          {/* Change the action button if it's the signed in bands layout being displayed */}
          <Link
            href={{ pathname: "/(main)/band-view", params: { id } }}
            asChild
          >
            <Pressable style={styles.button}>
              <ThemeText type="defaultSemiBold">View</ThemeText>
            </Pressable>
          </Link>
          <Pressable onPress={handleEmail}>
            <ThemeText type="link">Report</ThemeText>
          </Pressable>
        </View>

        <Image source={{ uri: picture }} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: "column",
    backgroundColor: "#ffffffff",
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android
    elevation: 6,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "column",
    alignItems: "baseline",
    justifyContent: "space-evenly",
  },
  // right
  image: { width: 180, height: 180, borderRadius: 10 },
  button: {
    backgroundColor: colors.secondary,
    alignItems: "center",
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
  },
});
