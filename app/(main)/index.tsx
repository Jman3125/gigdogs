import { BandDisplay } from "@/components/band-display";
import BlankSearch from "@/components/blank-search";
import Loading from "@/components/loading";
import LogoTitle from "@/components/logo-title";
import SearchLocation from "@/components/search-location";
import { ThemeText } from "@/components/theme-text";
import { auth } from "@/config/firebaseConfig";
import { Band } from "@/models/band";
import { getAllBands } from "@/utilities/firebase/fetch-data";
import { getGenre } from "@/utilities/getGenreLabel";
import { shuffleArray } from "@/utilities/shuffleArray";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const navigator = useRouter();
  const [signedIn, updateSignedIn] = useState(false);

  const [city, setCity] = useState("");

  const [bandsData, setData] = useState<Band[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const data = await getAllBands();

      const shuffledData = shuffleArray(data);
      setData(shuffledData);

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      Alert.alert(
        "Error",
        "Failed to fetch artist data. Please try again later.",
      );
    }
  };

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);

      await fetchData();

      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          updateSignedIn(true);
          setLoading(false);
        } else {
          updateSignedIn(false);
          setLoading(false);
        }
      });

      return unsubscribe;
    };
    loadAllData();
  }, []);

  const handleEmail = () => {
    Linking.openURL(`mailto:gigdogscontact@gmail.com`);
  };

  const filterData = (band: Band) => {
    const matchesLocation =
      city === "" || band.location.toLowerCase().includes(city.toLowerCase());

    if (!matchesLocation) {
      return null;
    }

    return (
      <BandDisplay
        id={band.id}
        name={band.bandName}
        genre={getGenre(band.genre)}
        minPrice={band.pricePerHour}
        picture={band.picture}
        location={band.location}
        isUser={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {loading && <Loading />}

      {!loading && (
        <View style={styles.viewContainer}>
          <Stack.Screen
            options={{
              headerTitle: () => <LogoTitle />,
              headerRight: () =>
                signedIn ? (
                  <Ionicons
                    name="person-circle-outline"
                    size={38}
                    color="white"
                    onPress={() => navigator.navigate("/account-info")}
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
                <TouchableOpacity onPress={() => navigator.navigate("./about")}>
                  <Ionicons
                    name="information-circle-outline"
                    size={38}
                    color="white"
                  />
                </TouchableOpacity>
              ),
            }}
          />

          <ThemeText type="title" style={{ marginTop: 20 }}>
            Find Bands
          </ThemeText>

          {/* Search Filters */}
          <ThemeText type="defaultSemiBold">Search Your City</ThemeText>

          <SearchLocation city={city} setCity={setCity} />

          <Pressable onPress={handleEmail}>
            <ThemeText type="link">Click me to report accounts.</ThemeText>
          </Pressable>
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
                style={styles.listHeaderContainer}
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
  },

  viewContainer: {
    flex: 1,
    padding: 15,
  },

  flatListContainer: {
    flex: 1,
  },
  listHeaderContainer: {
    position: "relative",
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
  },
  headerButtonText: {
    color: "white",
  },
});
