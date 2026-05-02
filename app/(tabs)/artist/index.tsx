//Signed in artists booking offers page
import Loading from "@/components/loading";
import { OfferCell } from "@/components/offer-cell";
import { ThemeText } from "@/components/theme-text";
import { auth } from "@/config/firebaseConfig";
import { Artist } from "@/models/artist";
import { Offer } from "@/models/offer";
import { colors } from "@/utilities/colors";
import {
  getOffersByIdsDescending,
  getOneItem,
} from "@/utilities/firebase/fetch-data";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
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
  //Get the offers that this artist has applied to through appliedOfferIds
  const [offersDataOpen, setOffersDataOpen] = useState<Offer[]>([]);

  //Get the offers that this artist has ben accepted to through appliedOfferIds
  const [offersDataAccepted, setOffersDataAccepted] = useState<Offer[]>([]);

  //Loading state
  const [loading, setLoading] = useState(true);

  //refreshing state for pull-to-refresh
  const [refreshing, setRefreshing] = useState(false);

  const fetchOffersData = useCallback(async () => {
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
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching offer data:", error);
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
      "This page is where you'll see and manage all offers you've applied to on GigDogs. Once a venue accepts your offer, it will also show up here.",
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

              {offersDataAccepted.length === 0 &&
                offersDataOpen.length === 0 && (
                  <View style={styles.emptyStateView}>
                    <Image
                      source={require("@/assets/images/logo.png")}
                      style={styles.logo}
                    />
                    <ThemeText type="subtitle">Nothing to see here!</ThemeText>
                    <ThemeText type="defaultSemiBold">
                      Go apply to your first offer on the search page!
                    </ThemeText>
                  </View>
                )}

              {/* This is where we put all of the accepted offers in a list */}
              {offersDataAccepted.length !== 0 && (
                <View style={styles.acceptedContainer}>
                  <ThemeText type="subtitle" style={{ marginBottom: 10 }}>
                    Coming up{" "}
                    <FontAwesome name="calendar" size={28} color={"black"} />
                  </ThemeText>
                  <ThemeText type="caption" style={{ marginBottom: 5 }}>
                    You have been accepted for the following offers:
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
                      artistsApplied={"Locked In"}
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
                <ThemeText type="subtitle">Applied</ThemeText>
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
  title: {
    marginBottom: 20,
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
  horizontalWrap: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
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
