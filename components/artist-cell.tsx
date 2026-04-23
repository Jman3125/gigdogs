//Artist cell profile sneak peak
import { colors } from "@/utilities/colors";
import { getGenre } from "@/utilities/getGenreLabel";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { ThemeText } from "./theme-text";

type Props = {
  artistId: string;
  offerId: string;
  picture: string;
  name: string;
  genre: string;
};

export function ArtistCell({ artistId, offerId, name, genre, picture }: Props) {
  const router = useRouter();

  const openProfile = () => {
    router.push({
      pathname: "/artist-view",
      params: { artistId, offerId },
    });
  };
  return (
    <View style={styles.main}>
      <Pressable style={styles.container} onPress={openProfile}>
        <Image source={{ uri: picture }} style={styles.image} />
        <View style={styles.infoContainer}>
          <ThemeText type="subtitle" style={styles.name}>
            {name}
          </ThemeText>
          <ThemeText type="default">
            Genre:{" "}
            <ThemeText type="defaultSemiBold">{getGenre(genre)}</ThemeText>
          </ThemeText>
        </View>
        <FontAwesome
          name="chevron-right"
          size={32}
          color={"black"}
          style={styles.chevron}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    marginBottom: 25,
    gap: 5,
    // iOS
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,

    // Android
    elevation: 6,
  },
  container: {
    borderColor: "#444444",
    borderWidth: 1.5,
    borderRadius: 10,
    position: "relative",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    padding: 10,
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#ffffffff",
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    flexShrink: 1,
  },

  // right
  image: { width: 80, height: 80, borderRadius: 10 },
  name: { fontSize: 18, lineHeight: 25 },

  chevron: {
    position: "absolute",
    right: 5,
    top: "20%",
    marginTop: 20,
  },

  //Select artist dropdown
  select: {
    borderRadius: 10,
    backgroundColor: colors.primary,
    padding: 10,
    alignItems: "center",
  },
});
