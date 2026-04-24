//Signed in bands booking offers page
import Loading from "@/components/loading";
import { OfferCell } from "@/components/offer-cell";
import { ThemeText } from "@/components/theme-text";
import { auth } from "@/config/firebaseConfig";
import { Offer } from "@/models/offer";
import { Venue } from "@/models/venue";
import { colors } from "@/utilities/colors";
import {
  getOffersByIdsDescending,
  getOneItem,
} from "@/utilities/firebase/fetch-data";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
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

  //refreshing state for pull-to-refresh
  const [refreshing, setRefreshing] = useState(false);

  const fetchOffersData = useCallback(async () => {
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
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching artist data:", error);
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchOffersData();
  }, [fetchOffersData]);

  //Refresh data when tab is focused
  useFocusEffect(
    useCallback(() => {
      fetchOffersData();
    }, [fetchOffersData]),
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOffersData();
  };

  //User wants information about the page
  const openInfoAlert = () => {
    Alert.alert(
      "Information",
      "This page is where you'll see and manage all offers you've posted on GigDogs. You will also see offers you have locked in an artist for.",
    );
  };

  //Open support contact
  const openSupportContact = () => {
    Linking.openURL(`mailto:gigdogscontact@gmail.com`);
  };

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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
            />
          }
          ListHeaderComponent={
            <View style={styles.mainHeaderContainer}>
              <Pressable onPress={openInfoAlert} style={{ marginBottom: 15 }}>
                <ThemeText type="subtitle">
                  Events Dashboard{" "}
                  <FontAwesome name="info-circle" size={25} color={"gray"} />
                </ThemeText>
              </Pressable>
              <Pressable style={styles.createEventButton} onPress={openModal}>
                <ThemeText type="subtitle">Create Offer</ThemeText>
                <FontAwesome
                  name="plus"
                  size={34}
                  color={"black"}
                ></FontAwesome>
              </Pressable>

              {offersDataAccepted.length === 0 &&
                offersDataOpen.length === 0 && (
                  <View style={styles.emptyStateView}>
                    <Image
                      source={require("@/assets/images/logo.png")}
                      style={styles.logo}
                    />
                    <ThemeText type="subtitle">No offers created</ThemeText>
                    <ThemeText type="defaultSemiBold">
                      Create Your First Offer!
                    </ThemeText>
                  </View>
                )}

              {offersDataAccepted.length !== 0 ||
                (offersDataAccepted.length !== 0 && (
                  <ThemeText type="caption">
                    Select an offer to see details
                  </ThemeText>
                ))}

              {offersDataAccepted.length !== 0 && (
                <View style={styles.acceptedContainer}>
                  {/* This is where we put all of the accepted offers in a list */}
                  <ThemeText type="subtitle" style={{ marginBottom: 10 }}>
                    Coming up{" "}
                    <FontAwesome name="calendar" size={28} color={"black"} />
                  </ThemeText>

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
                      artistsApplied={"Locked"}
                      setLoading={setLoading}
                    />
                  ))}

                  <View style={styles.horizontalWrap}>
                    <Pressable onPress={openSupportContact}>
                      <ThemeText type="link">Contact us</ThemeText>
                    </Pressable>
                    <ThemeText type="caption">
                      for cancellations & questions
                    </ThemeText>
                  </View>
                </View>
              )}

              {offersDataOpen.length !== 0 && (
                <View>
                  <ThemeText type="subtitle">Open Offers</ThemeText>
                  <ThemeText type="caption">
                    Select an artist to lock in a date or remove an offer.
                  </ThemeText>
                </View>
              )}
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
  mainHeaderContainer: {
    alignItems: "center",
  },
  acceptedContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 25,
    // iOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    // Android
    elevation: 6,
  },
  createEventButton: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    width: "100%",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    height: 50,
    width: "100%",
    padding: 8,
    color: "black",
    backgroundColor: "white",
    borderRadius: 10,
  },
  horizontalWrap: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  emptyStateView: {
    marginTop: 50,
    alignItems: "center",
  },
  logo: {
    height: 150,
    resizeMode: "contain",
    marginLeft: 15,
  },
});
