// Main feed page

import BlankSearch from "@/components/blank-search";
import Loading from "@/components/loading";
import { OfferCell } from "@/components/offer-cell";
import { ThemeText } from "@/components/theme-text";
import VerifyEmailAlert from "@/components/verify-email-alert";
import { auth } from "@/config/firebaseConfig";
import { ReloadFeedContext } from "@/context/reload-feed";
import { States } from "@/models/artist";
import { MockData, Venue } from "@/models/venue";
import { CheckVerification } from "@/utilities/authenticate/verify-email";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  //Will use context to know when user updated account to reload feed
  const { reload, setReload } = useContext(ReloadFeedContext);

  //State of if user is signed in
  //const [_, updateSignedIn] = useState(false);

  //For State selection Drop down picker
  //For Genre picker selection
  const [openState, setOpenState] = useState(false);
  const [states, setStates] = useState(States);
  const [state, setState] = useState("xyz");

  //state to populate bands
  const [venuesData, setData] = useState<Venue[]>([]);

  //loading state
  const [loading, setLoading] = useState(true);

  //Show error
  const [error, setError] = useState("");

  //Show alert for user to update their email address
  const [verifyEmail, setVerifyEmail] = useState(false);

  //Fetch all of the offers from selected state to display
  const fetchOffers = async (state: string) => {
    try {
      //const data = await getAllBands();
      //Shuffle the data so it's not in same order every load
      //JACK - THIS IS HOW YOU POPULATE VENUES
      //const shuffledData = shuffleArray(data);
      //setData(shuffledData);

      //Now just set data to mock data venues that are in teh same states as state
      setData(MockData.venues.filter((venue) => venue.state === state));
    } catch (error: any) {
      setError(error.message);
      Alert.alert(
        "Error",
        "Failed to fetch artist data. Please try again later.",
      );
    }
  };

  //Use effect function that watches to see if user has not verified email and shows
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const check = async () => {
        const result = await CheckVerification();
        if (isActive && !result.valid) {
          setVerifyEmail(true); // show banner
        } else {
          setVerifyEmail(false); // hide it
        }
      };
      //I don't want to set false if user does not exist
      if (auth.currentUser) {
        check();
      }

      return () => {
        isActive = false;
      };
    }, []),
  );

  // Define the function outside the effect
  const loadOffersFromState = useCallback(async (state: string) => {
    try {
      setLoading(true);
      await fetchOffers(state);
    } finally {
      setLoading(false);
    }
  }, []);

  //On page load get all data
  useEffect(() => {
    //will be the initial data load
    loadOffersFromState(state);
    console.log({ state });
  }, [state]);

  //set up auth listener
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     updateSignedIn(!!user);
  //   });

  //   return unsubscribe; // cleanup properly
  // }, []);

  //if user updated account refresh page with context variable
  useFocusEffect(
    useCallback(() => {
      //If we needed to manually refresh main feed from another page
      if (reload) {
        loadOffersFromState(state);
        Alert.alert(
          "Success",
          "See your information in the feed. Thanks for using GigDogs!",
        );
        setReload(false);
      }
    }, [reload, loadOffersFromState, setReload]),
  );

  //Used to repopulate bands that match entered location
  // const filteredVenues = venuesData.filter((venue) => {
  //   const matchesLocation = state === "" || venue.state == state;

  //   return matchesLocation;
  // });

  //This will go through each venue and return the offers from that venue to display in the feed
  const venuesOffers = venuesData.flatMap((venue) =>
    venue.offers.map((offer) => {
      return {
        ...offer,
        venueId: venue.id,
        venueName: venue.venueName,
        venueImage: venue.venueImage,
        state: venue.state,
        address: venue.address,
        email: venue.email,
        phone: venue.phone,
        website: venue.website,
        instagram: venue.instagram,
        facebook: venue.facebook,
      };
    }),
  );

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      {loading && <Loading />}
      {!loading && (
        <View style={styles.viewContainer}>
          <View style={styles.headerContainer}>
            {verifyEmail && (
              <VerifyEmailAlert email={`${auth.currentUser?.email}`} />
            )}
            {/* header above flatlist, search bar, page header, report content overlay */}
            <ThemeText type="title" style={{ marginTop: 20 }}>
              Find Gigs
            </ThemeText>

            {/* Search Filter */}
            <View style={styles.searchFilterHeaders}>
              <ThemeText type="defaultSemiBold">Enter a State</ThemeText>
            </View>

            {/* Filter search */}
            <DropDownPicker
              open={openState}
              value={state}
              items={states}
              setOpen={setOpenState}
              setValue={setState}
              setItems={setStates}
              placeholder="Choose State"
              // listMode="MODAL"
              style={styles.picker}
            />
          </View>

          <FlatList
            data={venuesOffers}
            keyExtractor={(offer) => offer.id}
            renderItem={({ item }) => (
              <OfferCell
                parentVenueId={item.venueId}
                offerId={item.id}
                name={item.venueName}
                picture={item.venueImage}
                date={item.date}
                time={item.time}
                offerAmount={item.offerAmount}
                //Just get the length of applied artists
                artistsApplied={item.appliedArtists.length}
              />
            )}
            keyboardShouldPersistTaps="always"
            style={styles.flatListContainer}
            ListEmptyComponent={<BlankSearch />}
            ListHeaderComponent={
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                {error && (
                  <ThemeText type="error">
                    There was an error loading data please try again later,{" "}
                    {error}
                  </ThemeText>
                )}
              </KeyboardAvoidingView>
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  viewContainer: {
    flex: 1,
    padding: 15,
  },

  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 15,
  },

  flatListContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
    width: "auto",
  },
  searchFilterHeaders: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchFilterHeadersRight: {
    backgroundColor: "#bebebe96",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginTop: 5,
    marginBottom: 25,
  },
  picker: {
    width: 200,
    marginBottom: 15,
  },
});
