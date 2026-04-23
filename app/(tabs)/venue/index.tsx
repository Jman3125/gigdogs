//Signed in bands booking offers page
import Loading from "@/components/loading";
import { OfferCell } from "@/components/offer-cell";
import { ThemeText } from "@/components/theme-text";
import { auth } from "@/config/firebaseConfig";
import { ReloadFeedContext } from "@/context/reload-feed";
import { Offer } from "@/models/offer";
import { Venue } from "@/models/venue";
import { colors } from "@/utilities/colors";
import {
  getOffersByIdsDescending,
  getOneItem,
} from "@/utilities/firebase/fetch-data";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  //Reload context variable
  const { reload, setReload } = useContext(ReloadFeedContext);

  const navigator = useRouter();
  const openModal = () => {
    navigator.navigate("/venue/create-offer");
  };
  //Get the offers that the venue has public
  const [offersDataOpen, setOffersDataOpen] = useState<Offer[]>([]);

  //Get the offers that the venue has closed
  const [offersDataAccepted, setOffersDataAccepted] = useState<Offer[]>([]);

  //loading state
  const [loading, setLoading] = useState(true);

  const fetchOffersdata = async () => {
    try {
      const currentVenue = await getOneItem<Venue>(
        auth.currentUser?.uid || "",
        "venues",
      );
      const offerIds = currentVenue?.offers || [];
      const dataOpen = await getOffersByIdsDescending<Offer>(offerIds, "open");
      const dataAccepted = await getOffersByIdsDescending<Offer>(
        offerIds,
        "accepted",
      );
      setOffersDataOpen(dataOpen);
      setOffersDataAccepted(dataAccepted);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching artist data:", error);
    }
  };

  useEffect(() => {
    fetchOffersdata();
  }, [fetchOffersdata]);

  //if user updated account refresh page with context variable
  useFocusEffect(
    useCallback(() => {
      //If we needed to manually refresh from another page
      if (reload) {
        fetchOffersdata();
        setReload(false);
      }
    }, [reload, fetchOffersdata, setReload]),
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
              type="venue"
              date={item.date}
              time={item.time}
              offerAmount={item.offerAmount}
              artistsApplied={
                item.appliedArtistIds ? item.appliedArtistIds.length : 0
              }
              setLoading={setLoading}
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
                <FontAwesome
                  name="plus"
                  size={34}
                  color={"black"}
                ></FontAwesome>
              </Pressable>

              <View>
                <ThemeText type="subtitle">Your Offers</ThemeText>
              </View>

              <View>
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
