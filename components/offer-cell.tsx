//Show venue profile on feed page
import { useAuthWithRole } from "@/hooks/use-auth-state";
import { colors } from "@/utilities/colors";
import {
  deleteOfferArtist,
  deleteOfferVenue,
} from "@/utilities/firebase/delete-offer";
import { formatTimeRange } from "@/utilities/format-time-range";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { ThemeText } from "./theme-text";

type Props = {
  offerId: string;
  name: string;
  showDelete?: boolean;
  //If it's an artist or venue, delete button does different things
  type?: string;
  date: string;
  time: string;
  offerAmount: number;
  artistsApplied: string | number;
  setLoading?: (loading: boolean) => void;
};

export function OfferCell({
  offerId,
  name,
  showDelete,
  type,
  date,
  time,
  offerAmount,
  artistsApplied,
  setLoading,
}: Props) {
  const router = useRouter();

  const { isSignedIn } = useAuthWithRole();

  const openProfile = () => {
    router.push({
      pathname: "/offer-view",
      params: { offerId },
    });
  };

  const confirmDeleteOfferArtist = () => {
    Alert.alert(
      "Notice",
      "Are you sure you want to remove your application for this offer?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          onPress: () => {
            // wrap async call so Alert doesn't complain
            tryDeleteOfferArtist(offerId);
          },
        },
      ],
    );
  };

  const confirmDeleteOfferVenue = () => {
    Alert.alert(
      "Notice",
      "Deleting this offer will remove it permanently and cannot be undone. It will remove all applied artists. Are you sure you want to proceed?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            // wrap async call so Alert doesn't complain
            tryDeleteOfferVenue(offerId);
          },
        },
      ],
    );
  };

  const tryDeleteOfferArtist = async (id: string) => {
    try {
      setLoading?.(true);
      // Call the deleteOffer function from utilities
      await deleteOfferArtist(id).then(() => {
        setLoading?.(false);
        Alert.alert("Success", "Removed successfully.");
      });
    } catch (error) {
      setLoading?.(false);
      Alert.alert(
        "Error",
        "There was an error deleting the offer. Please try again later.",
      );
    }
  };

  const tryDeleteOfferVenue = async (id: string) => {
    try {
      setLoading?.(true);
      // Call the deleteOffer function from utilities
      await deleteOfferVenue(id).then(() => {
        setLoading?.(false);
        Alert.alert("Success", "Removed successfully.");
      });
    } catch (error) {
      setLoading?.(false);
      Alert.alert(
        "Error",
        "There was an error deleting the offer. Please try again later.",
      );
    }
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
          Amount:{" "}
          {isSignedIn ? (
            <ThemeText type="defaultSemiBold">${offerAmount}</ThemeText>
          ) : (
            <FontAwesome name="lock" size={14} color={colors.placeholder} />
          )}
        </ThemeText>
        <ThemeText type="default">
          Artists Applied:{" "}
          <ThemeText type="defaultSemiBold">{artistsApplied}</ThemeText>
        </ThemeText>
      </View>

      {showDelete && type === "artist" && (
        <Pressable
          onPress={confirmDeleteOfferArtist}
          style={styles.deleteButton}
        >
          <ThemeText type="defaultSemiBold" style={{ color: colors.error }}>
            Remove
          </ThemeText>
          <FontAwesome name="trash" size={24} color={colors.error} />
        </Pressable>
      )}

      {showDelete && type === "venue" && (
        <Pressable
          onPress={confirmDeleteOfferVenue}
          style={styles.deleteButton}
        >
          <ThemeText type="defaultSemiBold" style={{ color: colors.error }}>
            Remove
          </ThemeText>
          <FontAwesome name="trash" size={24} color={colors.error} />
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    padding: 10,
    marginBottom: 15,
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

  deleteButton: {
    position: "absolute",
    top: 15,
    right: 5,
    flexDirection: "row",
    gap: 5,
    marginRight: 5,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "rgb(255, 149, 149)",
  },
});
