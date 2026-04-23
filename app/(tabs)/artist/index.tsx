//Signed in bands booking offers page
import Loading from "@/components/loading";
import { OfferCell } from "@/components/offer-cell";
import { ThemeText } from "@/components/theme-text";
import { auth } from "@/config/firebaseConfig";
import { ReloadFeedContext } from "@/context/reload-feed";
import { Artist } from "@/models/artist";
import { Offer } from "@/models/offer";
import { colors } from "@/utilities/colors";
import {
  getOffersByIdsDescending,
  getOneItem,
} from "@/utilities/firebase/fetch-data";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  //Get the offers that this artist has applied to through appliedOfferIds
  const [offersDataOpen, setOffersDataOpen] = useState<Offer[]>([]);

  //Get the offers that this artist has ben accepted to through appliedOfferIds
  const [offersDataAccepted, setOffersDataAccepted] = useState<Offer[]>([]);

  //Reload context variable
  const { reload, setReload } = useContext(ReloadFeedContext);

  //Loading state
  const [loading, setLoading] = useState(true);

  const fetchOffersData = async () => {
    try {
      const currentArtist = await getOneItem<Artist>(
        auth.currentUser?.uid || "",
        "users",
      );
      const appliedOfferIds = currentArtist?.appliedOfferIds || [];
      const dataOpen = await getOffersByIdsDescending<Offer>(
        appliedOfferIds,
        "open",
      );
      const dataAccepted = await getOffersByIdsDescending<Offer>(
        appliedOfferIds,
        "accepted",
      );
      setOffersDataOpen(dataOpen);
      setOffersDataAccepted(dataAccepted);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching offer data:", error);
    }
  };

  useEffect(() => {
    fetchOffersData();
  }, [fetchOffersData]);

  //if user updated account refresh page with context variable
  useFocusEffect(
    useCallback(() => {
      //If we needed to manually refresh from another page
      if (reload) {
        fetchOffersData();
        Alert.alert("Success", "Thanks for using GigDogs!");
        setReload(false);
      }
    }, [reload, fetchOffersData, setReload]),
  );

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      {loading && <Loading />}

      {!loading && (
        <FlatList
          data={offersDataOpen}
          keyExtractor={(offer) => offer.id}
          renderItem={({ item }) => (
            <OfferCell
              offerId={item.id}
              name={item.eventName}
              showDelete={true}
              type="artist"
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
                To apply to offers, go to the search page and click on an offer
                to see details and apply.
              </ThemeText>

              {/* This is where we put all of the accepted offers in a list */}
              <ThemeText type="subtitle">Accepted Offers</ThemeText>

              {offersDataAccepted.map((item) => (
                <OfferCell
                  key={item.id}
                  offerId={item.id}
                  name={item.eventName}
                  showDelete={false}
                  type="venue"
                  date={item.date}
                  time={item.time}
                  offerAmount={item.offerAmount}
                  artistsApplied={
                    item.appliedArtistIds ? item.appliedArtistIds.length : 0
                  }
                  setLoading={setLoading}
                />
              ))}

              <ThemeText type="subtitle">Open Offers</ThemeText>
            </View>
          }
        />
      )}
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
