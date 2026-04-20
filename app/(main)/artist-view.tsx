//Navigates to this page after a user clicks 'View' on a bands profile. adds band ID to url to get specific data.
import { LabelWrapper } from "@/components/label-wrapper";
import Loading from "@/components/loading";
import { ThemeText } from "@/components/theme-text";
import { Artist } from "@/models/artist";
import { getOneItem } from "@/utilities/firebase/fetch-data";
import { getGenre } from "@/utilities/getGenreLabel";
import { useLocalSearchParams } from "expo-router";
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

export default function ArtistView() {
  // Going to match the id to a band and get attributes so I don't pass them all through URL
  const { id } = useLocalSearchParams<{ id: string }>();
  // Find the band in the db that matches the id passed through the URL params
  const [artistData, setData] = useState<Artist | null>();
  const [loading, setLoading] = useState(true);

  //show error on failure
  const [error, setError] = useState("");

  //fetch the selected bands data
  const fetchArtistData = useCallback(async () => {
    try {
      const data = await getOneItem<Artist>(id, "artists");
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
    fetchArtistData();
  }, [fetchArtistData]);

  const openEmail = () => {
    Linking.openURL(
      `mailto:${artistData?.email}?subject=GigDogs Booking Inquiry`,
    );
  };

  //Open bands instagram account
  const linkInstagram = () => {
    Linking.openURL(
      `https://instagram.com/${artistData?.instagram?.trimEnd().toLowerCase()}`,
    );
  };
  //User wants to report content
  const handleReport = () => {
    Linking.openURL(
      `mailto:gigdogscontact@gmail.com?subject=Report&Inquiry&body=Please give the account name and problem so we can review it as soon as possible.`,
    );
  };
  return (
    <SafeAreaView style={styles.viewContainer} edges={[]}>
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
              numberOfLines={(artistData?.artistName?.length ?? 0) < 20 ? 1 : 2}
              adjustsFontSizeToFit
            >
              {artistData?.artistName}
            </ThemeText>
          </View>

          <View style={styles.infoContainerMain}>
            <ThemeText type="subtitle">Info</ThemeText>
            <Image source={{ uri: artistData?.picture }} style={styles.image} />

            <View style={styles.profileContainerSub}>
              <LabelWrapper label="Genre:">
                <ThemeText type="defaultSemiBold">
                  {getGenre(artistData?.genre || "All")}
                </ThemeText>
              </LabelWrapper>

              <LabelWrapper label="Bio">
                <ThemeText type="defaultSemiBold">{artistData?.bio}</ThemeText>
              </LabelWrapper>
              {artistData?.instagram && (
                <LabelWrapper label="Instagram:">
                  <Pressable onPress={linkInstagram}>
                    <ThemeText type="link">{artistData?.instagram}</ThemeText>
                  </Pressable>
                </LabelWrapper>
              )}

              {artistData?.facebook && (
                <LabelWrapper label="Facebook:">
                  <Pressable onPress={linkInstagram}>
                    <ThemeText type="link">{artistData?.facebook}</ThemeText>
                  </Pressable>
                </LabelWrapper>
              )}
              <LabelWrapper label="Email:">
                <Pressable onPress={openEmail}>
                  <ThemeText type="link">{artistData?.email}</ThemeText>
                </Pressable>
              </LabelWrapper>
            </View>

            <Pressable onPress={handleReport} style={styles.report}>
              <ThemeText type="link">Report Account</ThemeText>
            </Pressable>
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
    flexDirection: "column",
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
