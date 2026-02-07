import { BandDisplay } from "@/components/band-display";
import { QueryDisplay } from "@/components/query-display";
import { ThemeText } from "@/components/theme-text";
import { auth, db } from "@/config/firebaseConfig";
import { Band } from "@/models/band";
import { useRouter } from "expo-router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const navigator = useRouter();
  const [signedIn, updateSignedIn] = useState(false);
  const [signedInBand, setSignedInBand] = useState<any>(null);

  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const [bandsData, setBandsData] = useState<Band[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const bandsCollection = await getDocs(collection(db, "users"));
      const bandsData = bandsCollection.docs.map((doc) => doc.data() as Band);
      setBandsData(bandsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bands data:", error);
      Alert.alert(
        "Error",
        "Failed to fetch artist data. Please try again later.",
      );
      setLoading(false);
    }
  };

  // fetch signed in bands data
  async function fetchBandData(uid: string) {
    const bandDocRef = doc(db, "users", uid);
    const bandSnapshot = await getDoc(bandDocRef);

    if (bandSnapshot.exists()) {
      return bandSnapshot.data();
    } else {
      console.log("No band data found for UID:", uid);
      return null;
    }
  }

  //On page load fetch data and set up auth listener to update signed-in state. Cleanup listener on unmount.
  useEffect(() => {
    fetchData();

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        updateSignedIn(true);
        const bandData = await fetchBandData(user.uid);
        setSignedInBand(bandData);
      } else {
        updateSignedIn(false);
        setSignedInBand(null);
      }
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    // Placeholder sign-in function
    navigator.navigate("/(pages)/(authenticate)/signup");
  };

  const filterData = (band: Band) => {
    const matchesLocation =
      location === "" ||
      band.location.toLowerCase().includes(location.toLowerCase());

    const matchesPrice = price === "" || band.pricePerHour <= Number(price);

    if (!matchesLocation || !matchesPrice) {
      return null;
    }

    return (
      <BandDisplay
        id={band.id}
        name={band.bandName}
        genre={band.genre}
        minPrice={band.pricePerHour}
        picture={band.picture}
        isUser={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.viewContainer}>
      <FlatList
        data={bandsData}
        keyExtractor={(band) => band.id}
        renderItem={({ item: band }) => filterData(band)}
        ListHeaderComponent={
          <>
            {/* Need to guard this account section so it only displays if user logged in */}
            {signedIn && (
              <>
                {/* This is where we will pass current signed in users data. */}
                <BandDisplay
                  id={signedInBand?.id || ""}
                  picture={signedInBand?.picture || ""}
                  name={signedInBand?.bandName || ""}
                  genre={signedInBand?.genre || ""}
                  minPrice={signedInBand?.pricePerHour || 0}
                  isUser={true}
                />
              </>
            )}

            {!signedIn && (
              <>
                <Button title="Add Band" onPress={() => signIn()} />
              </>
            )}

            <ThemeText type="title" style={{ marginTop: 20 }}>
              Find Bands
            </ThemeText>

            {/* Search Filters */}
            <QueryDisplay
              location={location}
              setLocation={setLocation}
              price={price}
              setPrice={setPrice}
            />
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
});
