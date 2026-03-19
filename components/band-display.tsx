//Show band profile on feed page
import { colors } from "@/utilities/colors";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
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
  const router = useRouter();

  const openProfile = () => {
    router.push({
      pathname: "/(main)/band-view",
      params: { id },
    });
  };
  return (
    <Pressable style={styles.container} onPress={openProfile}>
      <ThemeText type="default">{location}</ThemeText>
      <ThemeText type="subtitle">{name}</ThemeText>

      <View style={styles.infoContainer}>
        <View style={styles.left}>
          <ThemeText type="default">
            Genre: <ThemeText type="defaultSemiBold">{genre}</ThemeText>
          </ThemeText>
          <ThemeText type="default">
            Price Per Hour:{" "}
            <ThemeText type="defaultSemiBold">${minPrice}</ThemeText>
          </ThemeText>

          {/* Change the action button if it's the signed in bands layout being displayed */}
          <View style={styles.button}>
            <ThemeText type="defaultSemiBold">See More</ThemeText>
          </View>
        </View>

        <Image source={{ uri: picture }} style={styles.image} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 25,
    borderRadius: 10,
    flexDirection: "column",
    backgroundColor: "#ffffffff",
    borderColor: "#444444",
    borderWidth: 1.5,

    // iOS
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 25,

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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
    height: 45,
  },
});
