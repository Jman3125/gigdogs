//Signed in bands booking offers page
import { OfferCell } from "@/components/offer-cell";
import { ThemeText } from "@/components/theme-text";
import { auth } from "@/config/firebaseConfig";
import { Artist } from "@/models/artist";
import { Offer } from "@/models/offer";
import { colors } from "@/utilities/colors";
import { getItemsByIds, getOneItem } from "@/utilities/firebase/fetch-data";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  //Get the offers that this artist has applied to through appliedOfferIds
  const [offersData, setOffersData] = useState<Offer[]>([]);

  const fetchArtistData = async () => {
    try {
      const currentArtist = await getOneItem<Artist>(
        auth.currentUser?.uid || "",
        "users",
      );
      const appliedOfferIds = currentArtist?.appliedOfferIds || [];
      const data = await getItemsByIds<Offer>(appliedOfferIds, "offers");
      setOffersData(data);
    } catch (error) {
      console.error("Error fetching offer data:", error);
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
            <ThemeText type="subtitle">
              You have not applied to any offers yet.
            </ThemeText>
          </View>
        }
        ListHeaderComponent={
          <View>
            <ThemeText type="title">Offers</ThemeText>
            <ThemeText type="default">
              To apply to offers, go to the search page and click on an offer to
              see details and apply.
            </ThemeText>
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
  title: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    padding: 8,
    color: "black",
    backgroundColor: "white",
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: "100%",
    height: 50,
    borderRadius: 15,
  },
  headerButton: {
    alignItems: "center",
    marginRight: 10,
    flexDirection: "row",
  },
  headerText: {
    color: "white",
  },
  //Show reauthentication fields
  reAuthenticateContainer: {
    padding: 5,
    backgroundColor: "rgb(236, 236, 236)",
    borderRadius: 10,
  },
});
