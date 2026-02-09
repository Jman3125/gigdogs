//Navigates to this page after a user clicks 'See More' on a bands profile
import { LabelWrapper } from "@/components/label-wrapper";
import Loading from "@/components/loading";
import LogoTitle from "@/components/logo-title";
import { ThemeText } from "@/components/theme-text";
import { Band } from "@/models/band";
import { colors } from "@/utilities/colors";
import { getAllBands } from "@/utilities/firebase/fetch-data";
import { getGenre } from "@/utilities/getGenreLabel";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BandView() {
  const navigator = useRouter();

  // Going to match the id to a band and get attributes so I don't pass them all through URL
  const { id } = useLocalSearchParams();

  // Find the band in the db that matches the id passed through the URL params
  const [bandsData, setData] = useState<Band[]>([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const data = await getAllBands();
      setData(data);
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
    fetchData();
  }, []);

  const handleEmail = () => {
    Linking.openURL(
      `mailto:${matched?.email}?subject='Booking' Inquiry&body=Hi ${matched?.bandName}, I found you band on Gig Dogs and was interested in booking your band for my upcoming event on (EVENT DATE). I will need you guys to play for (SET TIME) at (EVENT LOCATION). Let me know if this works for you!`,
    );
  };

  const handlePhone = () => {
    Linking.openURL(
      `sms:${matched?.phone}?body=Hi ${matched?.bandName}, I found you band on Gig Dogs and was interested in booking your band for my upcoming event on (EVENT DATE). I will need you guys to play for (SET TIME) at (EVENT LOCATION). Let me know if this works for you!`,
    );
  };

  const matched = bandsData.find((item) => item.id === id);

  return (
    <SafeAreaView style={styles.viewContainer} edges={["bottom"]}>
      <Stack.Screen
        options={{
          headerTitle: () => <LogoTitle />,
          headerLeft: () => (
            <Pressable
              style={styles.headerButton}
              onPress={() => navigator.back()}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
              <ThemeText type="defaultSemiBold" style={styles.headerText}>
                Feed
              </ThemeText>
            </Pressable>
          ),
        }}
      />
      {loading && <Loading />}

      {!loading && (
        <ScrollView>
          {error && (
            <ThemeText type="error">
              There was an error loading the data, please try again later.
              Error: {error}
            </ThemeText>
          )}
          <ThemeText type="title">{matched?.bandName}</ThemeText>
          <ThemeText type="defaultSemiBold">{matched?.bio}</ThemeText>

          <View style={styles.profileContainerMain}>
            <ThemeText type="subtitle">Info</ThemeText>
            <Image source={{ uri: matched?.picture }} style={styles.image} />

            <View style={styles.profileContainerSub}>
              <View>
                <LabelWrapper label="Genre:">
                  <ThemeText type="defaultSemiBold">
                    {getGenre(matched?.genre || "All")}
                  </ThemeText>
                </LabelWrapper>

                <LabelWrapper label="Price Per Hour:">
                  <ThemeText type="defaultSemiBold">
                    ${matched?.pricePerHour}
                  </ThemeText>
                </LabelWrapper>

                <LabelWrapper label="Max Play Time:">
                  <ThemeText type="defaultSemiBold">
                    {matched?.hours} Hours, {matched?.minutes} Minutes
                  </ThemeText>
                </LabelWrapper>

                <LabelWrapper label="Instagram:">
                  <ThemeText type="defaultSemiBold">
                    {matched?.instagram}
                  </ThemeText>
                </LabelWrapper>
              </View>
            </View>
            <LabelWrapper label="Location">
              <ThemeText type="defaultSemiBold">{matched?.location}</ThemeText>
            </LabelWrapper>
            <View style={styles.contactContainer}>
              <Pressable onPress={handlePhone} style={styles.contactButton}>
                <ThemeText type="defaultSemiBold">Message</ThemeText>
              </Pressable>
              <Pressable onPress={handleEmail} style={styles.contactButton}>
                <ThemeText type="defaultSemiBold">Email</ThemeText>
              </Pressable>
              <ThemeText type="default">
                *By proceeding to contact you agree to Gig Dogs terms and
                conditions
              </ThemeText>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    padding: 15,
  },
  profileContainerMain: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "column",
    marginTop: 15,
    marginBottom: 15,
    position: "relative",
    backgroundColor: "#ffffffff",
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android
    elevation: 6,
  },
  profileContainerSub: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  image: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 180,
    height: 180,
    borderRadius: 8,
  },
  contactContainer: {
    flexDirection: "column",
  },
  contactButton: {
    width: "100%",
    height: 50,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderRadius: 25,
  },
  headerButton: {
    alignItems: "center",
    marginRight: 10,
    flexDirection: "row",
  },
  headerText: {
    color: "white",
  },
});
