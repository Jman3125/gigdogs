// Main feed page
import BlankSearch from "@/components/blank-search";
import Loading from "@/components/loading";
import SearchLocation from "@/components/search-location";
import { ThemeText } from "@/components/theme-text";
import { VenueCell } from "@/components/venue-cell";
import VerifyEmailAlert from "@/components/verify-email-alert";
import { auth } from "@/config/firebaseConfig";
import { ReloadFeedContext } from "@/context/reload-feed";
import { Venue } from "@/models/venue";
import { colors } from "@/utilities/colors";
import { getAllVenuesByState } from "@/utilities/firebase/fetch-data";
import { CheckVerification } from "@/utilities/validate/verify-email";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  //Will use context to know when user updated account to reload feed
  const { reload, setReload } = useContext(ReloadFeedContext);

  //For State searching
  const [searchInput, setSearchInput] = useState("");
  const [state, setState] = useState("");

  //state to populate offers
  const [venuesData, setData] = useState<Venue[]>([]);

  //loading state
  const [loading, setLoading] = useState(true);

  //Show error
  const [error, setError] = useState("");

  //Show alert for user to update their email address
  const [verifyEmail, setVerifyEmail] = useState(false);

  //refreshing state for pull-to-refresh
  const [refreshing, setRefreshing] = useState(false);

  //Fetch all of the offers from selected state to display
  const fetchOffers = async (filterState: string) => {
    try {
      const data = await getAllVenuesByState(filterState);
      setData(data);
    } catch (error: any) {
      setError(error.message);
      Alert.alert("Error", "Failed to fetch data. Please try again later.");
    }
  };

  //Use effect function that watches to see if user has not verified email and shows verify email alert
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
      setRefreshing(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadOffersFromState(state);
  };

  //On page load get all data
  useEffect(() => {
    //will be the initial data load
    loadOffersFromState(state);
  }, [loadOffersFromState, state]);

  //if user updated account refresh page with context variable
  useFocusEffect(
    useCallback(() => {
      //If we needed to manually refresh main feed from another page
      if (reload) {
        loadOffersFromState(state);
        Alert.alert("Success", "Thanks for using GigDogs!");
        setReload(false);
      }
    }, [reload, state, loadOffersFromState, setReload]),
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
            {/* Search Bar */}
            <View style={styles.searchBar}>
              <SearchLocation state={searchInput} setState={setSearchInput} />
              <Pressable
                style={styles.searchButton}
                onPress={() => setState(searchInput)}
              >
                <FontAwesome name="search" size={28} color={"white"} />
              </Pressable>
            </View>
          </View>

          <FlatList
            data={venuesData}
            keyExtractor={(venue) => venue.id}
            renderItem={({ item }) => (
              <VenueCell
                id={item.id}
                name={item.venueName}
                offers={item.offers ? item.offers.length : 0}
                venueImage={item.picture}
                //Just get the length of applied artists
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
            style={styles.flatListContainer}
            ListEmptyComponent={<BlankSearch noneSelected={state === ""} />}
            ListHeaderComponent={
              <View>
                {error && (
                  <ThemeText type="error">
                    There was an error loading data please try again later,{" "}
                    {error}
                  </ThemeText>
                )}
              </View>
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
  searchBar: {
    flexDirection: "row",
    gap: 5,
  },
  searchButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    height: 50,
    width: "15%",
    marginTop: 4,
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
