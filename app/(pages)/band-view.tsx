//Navigates to this page after a user clicks 'See More' on a bands profile
import { ThemeText } from "@/components/theme-text";
import { db } from "@/config/firebaseConfig";
import { Band } from "@/models/band";
import { useLocalSearchParams, useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Button, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BandView() {
  const navigator = useRouter();

  // Going to match the id to a band and get attributes so I don't pass them all through URL
  const { id } = useLocalSearchParams();

  // Find the band in the db that matches the id passed through the URL params
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

  useEffect(() => {
    fetchData();
  }, []);

  const matched = bandsData.find((item) => item.id === id);

  return (
    <SafeAreaView style={styles.viewContainer}>
      <ScrollView>
        <Button onPress={() => navigator.back()} title="Go Back" />
        <ThemeText type="default">Band Name: {matched?.bandName}</ThemeText>
        <ThemeText type="default">Genre: {matched?.genre}</ThemeText>
        <ThemeText type="default">
          Minimum Price: {matched?.pricePerHour}
        </ThemeText>
        <ThemeText type="default">Instagram: {matched?.instagram}</ThemeText>
        <ThemeText type="default">Set Time: {matched?.hours}</ThemeText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    padding: 15,
  },
});
