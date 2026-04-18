//Show venue profile on feed page
import { colors } from "@/utilities/colors";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { ThemeText } from "./theme-text";

type Props = {
  parentVenueId: string;
  offerId: string;
  name: string;
  date: string;
  time: string;
  offerAmount: number;
  picture: string;
  artistsApplied: number;
};

export function OfferCell({
  parentVenueId,
  offerId,
  name,
  picture,
  date,
  time,
  offerAmount,
  artistsApplied,
}: Props) {
  const router = useRouter();

  const openProfile = () => {
    console.log(parentVenueId, offerId);
    router.navigate({
      pathname: "/offer-view",
      params: { parentVenueId, offerId },
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
          Date: <ThemeText type="defaultSemiBold">{date}</ThemeText>
        </ThemeText>
        <ThemeText type="default">
          Time: <ThemeText type="defaultSemiBold">{time}</ThemeText>
        </ThemeText>
        <ThemeText type="default">
          Amount: <ThemeText type="defaultSemiBold">{offerAmount}</ThemeText>
        </ThemeText>
        <ThemeText type="default">
          Bands Applied:{" "}
          <ThemeText type="defaultSemiBold">{artistsApplied}</ThemeText>
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
