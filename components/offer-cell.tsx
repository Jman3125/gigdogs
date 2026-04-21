//Show venue profile on feed page
import { colors } from "@/utilities/colors";
import { formatTimeRange } from "@/utilities/format-time-range";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemeText } from "./theme-text";

type Props = {
  offerId: string;
  name: string;
  date: string;
  time: string;
  offerAmount: number;
  artistsApplied: number;
};

export function OfferCell({
  offerId,
  name,
  date,
  time,
  offerAmount,
  artistsApplied,
}: Props) {
  const router = useRouter();

  const openProfile = () => {
    router.navigate({
      pathname: "/offer-view",
      params: { offerId },
    });
  };
  return (
    <Pressable style={styles.container} onPress={openProfile}>
      <View style={styles.infoContainer}>
        <ThemeText type="subtitle" style={styles.name}>
          {name}
        </ThemeText>
        <ThemeText type="default">
          Date:{" "}
          <ThemeText type="defaultSemiBold">
            {new Date(date).toLocaleDateString()}
          </ThemeText>
        </ThemeText>
        <ThemeText type="default">
          Time:{" "}
          <ThemeText type="defaultSemiBold">{formatTimeRange(time)}</ThemeText>
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

  name: { fontSize: 18, lineHeight: 25 },
});
