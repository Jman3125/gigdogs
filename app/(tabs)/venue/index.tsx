//Signed in bands booking offers page
import { OfferCell } from "@/components/offer-cell";
import { ThemeText } from "@/components/theme-text";
import { auth } from "@/config/firebaseConfig";
import { Offer } from "@/models/offer";
import { Venue } from "@/models/venue";
import { colors } from "@/utilities/colors";
import { getItemsByIds, getOneItem } from "@/utilities/firebase/fetch-data";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  const navigator = useRouter();
  const openModal = () => {
    navigator.navigate("/venue/create-offer");
  };
  //Get the offers that this artist has applied to through appliedOfferIds
  const [offersData, setOffersData] = useState<Offer[]>([]);

  const fetchArtistData = async () => {
    try {
      const currentVenue = await getOneItem<Venue>(
        auth.currentUser?.uid || "",
        "venues",
      );
      const offerIds = currentVenue?.offers || [];
      const data = await getItemsByIds<Offer>(offerIds, "offers");
      setOffersData(data);
    } catch (error) {
      console.error("Error fetching artist data:", error);
    }
  };

  useEffect(() => {
    fetchArtistData();
  }, [fetchArtistData]);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <FlatList
        data={offersData}
        keyExtractor={(offer) => offer.id}
        renderItem={({ item }) => (
          <OfferCell
            offerId={item.id}
            name={item.eventName}
            date={item.date}
            time={item.time}
            offerAmount={item.offerAmount}
            artistsApplied={
              item.appliedArtistIds ? item.appliedArtistIds.length : 0
            }
          />
        )}
        keyboardShouldPersistTaps="always"
        ListEmptyComponent={
          <View>
            <ThemeText type="defaultSemiBold">
              You have not applied to any offers yet.
            </ThemeText>
          </View>
        }
        ListHeaderComponent={
          <View>
            <Pressable style={styles.createEventButton} onPress={openModal}>
              <ThemeText type="subtitle">Create Offer</ThemeText>
              <FontAwesome name="plus" size={34} color={"black"}></FontAwesome>
            </Pressable>

            <View>
              <ThemeText type="subtitle">Your Offers</ThemeText>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  createEventButton: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    width: "100%",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
  },
  input: {
    height: 50,
    width: "100%",
    padding: 8,
    color: "black",
    backgroundColor: "white",
    borderRadius: 10,
  },
});
