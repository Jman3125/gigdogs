//Navigates to this page after a user clicks 'View' on a bands profile. adds band ID to url to get specific data.
import { LabelWrapper } from "@/components/label-wrapper";
import Loading from "@/components/loading";
import LogoTitle from "@/components/logo-title";
import { TermsPrivacyLinks } from "@/components/terms-privacy";
import { ThemeText } from "@/components/theme-text";
import { Band } from "@/models/band";
import { colors } from "@/utilities/colors";
import { getOneBand } from "@/utilities/firebase/fetch-data";
import { getGenre } from "@/utilities/getGenreLabel";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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
  //router
  const navigator = useRouter();

  // Going to match the id to a band and get attributes so I don't pass them all through URL
  const { id } = useLocalSearchParams<{ id: string }>();
  // Find the band in the db that matches the id passed through the URL params
  const [bandData, setData] = useState<Band>();
  const [loading, setLoading] = useState(true);

  //show error on failure
  const [error, setError] = useState("");

  //fetch the selected bands data
  const fetchBandData = useCallback(async () => {
    try {
      const data = await getOneBand(id);
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
  }, [id]);

  //fetch bands data on load
  useEffect(() => {
    fetchBandData();
  }, [fetchBandData]);

  //Send text sms pre-format to bands phone number
  const handlePhone = () => {
    Linking.openURL(
      `sms:${bandData?.phone}?body=Hi ${bandData?.bandName}, I found your band on GigDogs and was interested in booking you for my upcoming event on EVENT DATE. I will need you to play for SET TIME at EVENT LOCATION. Let me know if this works for you!`,
    );
  };

  const handleEmail = () => {
    Linking.openURL(
      `mailto:${bandData?.email}?subject=GigDogs Booking Inquiry&body=Hi ${bandData?.bandName}, I found your band on GigDogs and was interested in booking you for my upcoming event on EVENT DATE. I will need you to play for SET TIME at EVENT LOCATION. Let me know if this works for you!`,
    );
  };

  //Open bands instagram account
  const linkInstagram = () => {
    Linking.openURL(
      `https://instagram.com/${bandData?.instagram.trimEnd().toLowerCase()}`,
    );
  };
  //User wants to report content
  const handleReport = () => {
    Linking.openURL(
      `mailto:gigdogscontact@gmail.com?subject=Report&Inquiry&body=Please give the account name and problem so we can review it as soon as possible.`,
    );
  };
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
          <View style={styles.headerContainer}>
            <ThemeText
              type="title"
              style={styles.bandName}
              numberOfLines={(bandData?.bandName?.length ?? 0) < 20 ? 1 : 2}
              adjustsFontSizeToFit
            >
              {bandData?.bandName}
            </ThemeText>
          </View>

          <View style={styles.infoContainerMain}>
            <ThemeText type="subtitle">Info</ThemeText>
            <Image source={{ uri: bandData?.picture }} style={styles.image} />

            <View style={styles.profileContainerSub}>
              <View>
                <LabelWrapper label="Genre:">
                  <ThemeText type="defaultSemiBold">
                    {getGenre(bandData?.genre || "All")}
                  </ThemeText>
                </LabelWrapper>

                <LabelWrapper label="Price Per Hour:">
                  <ThemeText type="defaultSemiBold">
                    ${bandData?.pricePerHour}
                  </ThemeText>
                </LabelWrapper>

                <LabelWrapper label="Max Play Time:">
                  <ThemeText type="defaultSemiBold">
                    {bandData?.hours} Hour{(bandData?.hours ?? 0) > 1 && "s"}
                    {bandData?.minutes !== 0 &&
                      `, ${bandData?.minutes} Minutes`}
                  </ThemeText>
                </LabelWrapper>
                <LabelWrapper label="Bio">
                  <ThemeText type="defaultSemiBold">{bandData?.bio}</ThemeText>
                </LabelWrapper>
                <LabelWrapper label="Instagram:">
                  <Pressable onPress={linkInstagram}>
                    <ThemeText type="link">{bandData?.instagram}</ThemeText>
                  </Pressable>
                </LabelWrapper>
              </View>
            </View>

            <LabelWrapper label="Location">
              <ThemeText type="defaultSemiBold">{bandData?.location}</ThemeText>
            </LabelWrapper>
            <View style={styles.contactContainer}>
              <Pressable onPress={handlePhone} style={styles.contactButton}>
                <ThemeText type="defaultSemiBold">Message</ThemeText>
              </Pressable>
              <Pressable
                onPress={handleEmail}
                style={styles.contactButtonSecondary}
              >
                <ThemeText type="defaultSemiBold">Email</ThemeText>
              </Pressable>
              <ThemeText type="caption">
                *By proceeding to contact you agree to GigDogs{" "}
                <TermsPrivacyLinks />
              </ThemeText>
              <Pressable onPress={handleReport} style={styles.report}>
                <ThemeText type="link">Report Account</ThemeText>
              </Pressable>
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
  headerContainer: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainerMain: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "column",
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
  contactButtonSecondary: {
    width: "100%",
    height: 50,
    backgroundColor: colors.primary,
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
  bandName: {
    fontSize: 35,
  },
  report: {
    marginTop: 15,
  },
});
