// Main feed page

import { BandDisplay } from "@/components/band-display";
import BlankSearch from "@/components/blank-search";
import Loading from "@/components/loading";
import LogoTitle from "@/components/logo-title";
import SearchLocation from "@/components/search-location";
import { ThemeText } from "@/components/theme-text";
import VerifyEmailAlert from "@/components/verify-email-alert";
import { auth } from "@/config/firebaseConfig";
import { ReloadFeedContext } from "@/context/reload-feed";
import { Band } from "@/models/band";
import { CheckVerification } from "@/utilities/authenticate/verify-email";
import { getAllBands } from "@/utilities/firebase/fetch-data";
import { getGenre } from "@/utilities/getGenreLabel";
import { shuffleArray } from "@/utilities/shuffleArray";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  //Will use context to know when user updated account to reload feed
  const { reload, setReload } = useContext(ReloadFeedContext);
  //Router
  const navigator = useRouter();

  //State of if user is signed in
  const [signedIn, updateSignedIn] = useState(false);

  //City search bar input state
  const [city, setCity] = useState("");

  //state to populate bands
  const [bandsData, setData] = useState<Band[]>([]);

  //loading state
  const [loading, setLoading] = useState(true);

  //Show error
  const [error, setError] = useState("");

  //Show alert for user to update their email address
  const [verifyEmail, setVerifyEmail] = useState(false);

  //To toggle search filters from city search to band name search
  //false for city true for band name search
  const [filter, toggleFilter] = useState(false);

  //used to keep state of band name search
  const [bandName, setBandName] = useState("");

  //Fetch all of the bands data to dipslay in feed
  const fetchData = async () => {
    try {
      const data = await getAllBands();
      //Shuffle the data so it's not in same order every load
      const shuffledData = shuffleArray(data);
      setData(shuffledData);
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
          setVerifyEmail(true); // show your banner
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

  // 1. Define the function outside the effect
  const loadAllData = useCallback(async () => {
    try {
      setLoading(true);
      await fetchData();
    } finally {
      setLoading(false);
    }
  }, []);

  //set up auth listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      updateSignedIn(!!user);
    });

    return unsubscribe; // cleanup properly
  }, []);

  //On page load get all data
  useEffect(() => {
    //will be the initial data load
    loadAllData();
  }, [loadAllData]);

  //if user updated account refresh page with context variable
  useFocusEffect(
    useCallback(() => {
      if (reload) {
        loadAllData();
        Alert.alert(
          "Success",
          "See your information in the feed. Thanks for using GigDogs!",
        );
        setReload(false);
      }
    }, [reload, loadAllData]),
  );

  //User wants to change search filter
  const changeSearchFilter = () => {
    //User changes from city search to bandname search or vice versa
    toggleFilter(!filter);
    //Clear all searches
    setBandName("");
    setCity("");
  };

  //Used to repopulate bands that match entered location
  const filterData = (band: Band) => {
    const matchesLocation =
      city === "" ||
      band.location.toLowerCase().includes(city.toLowerCase().trimEnd());
    const matchesName =
      bandName === "" ||
      band.bandName.toLowerCase().includes(bandName.toLowerCase().trimEnd());

    if (!matchesLocation) {
      return null;
    }
    if (!matchesName) {
      return null;
    }
    //return bands in BandDisplay format that match city search
    return (
      <BandDisplay
        id={band.id}
        name={band.bandName}
        //Get genre switches value form db to label which is just uppercase genre
        genre={getGenre(band.genre)}
        minPrice={band.pricePerHour}
        picture={band.picture}
        location={band.location}
      />
    );
  };

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <SafeAreaView style={styles.container} edges={["bottom"]}>
          <View style={styles.viewContainer}>
            <Stack.Screen
              options={{
                headerTitle: () => <LogoTitle />,
                headerRight: () =>
                  // If use is signed in show account button, if not show add band button
                  signedIn ? (
                    <Ionicons
                      name="person-circle-outline"
                      size={38}
                      color="white"
                      onPress={() => navigator.navigate("/account")}
                    />
                  ) : (
                    <TouchableOpacity
                      style={styles.headerButton}
                      onPress={() => navigator.navigate("./signup")}
                    >
                      <Ionicons name="add" size={24} color="white" />
                      <ThemeText
                        type="defaultSemiBold"
                        style={styles.headerButtonText}
                      >
                        Band
                      </ThemeText>
                    </TouchableOpacity>
                  ),
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => navigator.navigate("./about")}
                  >
                    <Ionicons
                      name="information-circle-outline"
                      size={38}
                      color="white"
                    />
                  </TouchableOpacity>
                ),
              }}
            />
            <View style={styles.headerContainer}>
              {verifyEmail && (
                <VerifyEmailAlert email={`${auth.currentUser?.email}`} />
              )}
              {/* header above flatlist, search bar, page header, report content overlay */}
              <ThemeText type="title" style={{ marginTop: 20 }}>
                Find Bands
              </ThemeText>

              {/* Search Filter */}
              <View style={styles.searchFilterHeaders}>
                <ThemeText type="defaultSemiBold">
                  {" "}
                  {filter ? "Search by band name" : "Search Your City"}
                </ThemeText>
                <ThemeText onPress={() => changeSearchFilter()} type="caption">
                  {filter ? "Search By City" : "Search by band name"}
                </ThemeText>
              </View>

              {/* If filter state is false, show city search */}
              {!filter && <SearchLocation city={city} setCity={setCity} />}
              {/* Search for specific band name */}
              {filter && (
                <TextInput
                  value={bandName}
                  onChangeText={setBandName}
                  style={styles.input}
                  placeholder="Enter Band name"
                />
              )}
            </View>

            <FlatList
              data={bandsData}
              keyExtractor={(band) => band.id}
              renderItem={({ item: band }) => filterData(band)}
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
        </SafeAreaView>
      )}
    </>
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
  headerButtonText: {
    color: "white",
  },
  searchFilterHeaders: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});
