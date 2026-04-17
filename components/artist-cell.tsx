//Artist cell profile sneak peak
import { colors } from "@/utilities/colors";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { ThemeText } from "./theme-text";

type Props = {
  id: string;
  picture: string;
  name: string;
  genre: string;
};

export function ArtistCell({ id, name, genre, picture }: Props) {
  const router = useRouter();

  const openProfile = () => {
    router.navigate({
      pathname: "/artist-view",
      params: { id },
    });
  };
  return (
    <Pressable style={styles.container} onPress={openProfile}>
      <Image source={{ uri: picture }} style={styles.image} />

      <View style={styles.infoContainer}>
        <ThemeText type="subtitle" style={styles.name}>
          {name}
        </ThemeText>
        <ThemeText type="default">
          Genre: <ThemeText type="defaultSemiBold">{genre}</ThemeText>
        </ThemeText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 25,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#ffffffff",
    borderColor: "#444444",
    borderWidth: 1.5,

    // iOS
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,

    // Android
    elevation: 6,
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: 230,
  },

  // right
  image: { width: 80, height: 80, borderRadius: 10 },
  name: { fontSize: 18, lineHeight: 25 },
});
