//Navigates to this page after a user clicks 'View' on an artists profile. adds artist UID to url to get specific data.
import { LabelWrapper } from "@/components/label-wrapper";
import Loading from "@/components/loading";
import { TermsPrivacyLinks } from "@/components/terms-privacy";
import { ThemeText } from "@/components/theme-text";
import { useApproveOffer } from "@/hooks/use-approve-offer";
import { Artist } from "@/models/artist";
import { Offer } from "@/models/offer";
import { colors } from "@/utilities/colors";
import { getOneItem } from "@/utilities/firebase/fetch-data";
import { getGenre, getType } from "@/utilities/getGenreLabel";
import { logEvent } from "expo-firebase-analytics";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArtistView() {
  const navigator = useRouter();
  // Going to match the id to an artist and get attributes so I don't pass them all through URL
  const { artistId, offerId } = useLocalSearchParams<{
    artistId: string;
    offerId: string;
  }>();
  // Find the artist in the db that matches the id passed through the URL params
  const [artistData, setData] = useState<Artist | null>();
  const [loading, setLoading] = useState(true);

  //show error on failure
  const [error, setError] = useState("");

  //Is this an accepted offer? If it is, then remove the select artist button
  const [offerAccepted, setOfferAccepted] = useState(false);

  //fetch the selected artist data
  const fetchArtistData = useCallback(async () => {
    try {
      const offerStatus = await getOneItem<Offer>(offerId, "offers");
      if (offerStatus?.status !== "open") {
        setOfferAccepted(true);
      }

      const data = await getOneItem<Artist>(artistId, "users");
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
  }, [artistId, offerId]);

  //fetch artists data on load
  useEffect(() => {
    fetchArtistData();
  }, [fetchArtistData]);

  const openEmail = () => {
    Linking.openURL(
      `mailto:${artistData?.email}?subject=GigDogs Booking Inquiry`,
    );
  };

  //Open artists instagram account
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

  const { approve } = useApproveOffer();

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await approve(offerId, artistId);
      setLoading(false);
      Alert.alert(
        "Success!",
        "You are now locked in with that artist. See more information in your profile!",
        [
          {
            text: "Ok",
            onPress: () => {
              //Log the event
              (logEvent("artist_selected", {
                offer: offerId,
                artistEmal: artistData?.email,
                artistPhone: artistData?.phone,
              }),
                navigator.back());
            },
          },
        ],
      );
    } catch (err) {
      console.error("Error:", err);
    }
  };

  //Select an artist for the corresponding offer
  const selectArtist = () => {
    Alert.alert(
      "Notice",
      "This locks you in with this artist and will close the offer, removing all other artists.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            // wrap async call so Alert doesn't complain
            handleConfirm();
          },
        },
      ],
    );
  };

  //open venues facebook account
  const linkFacebook = () => {
    Linking.openURL(
      `https://facebook.com/${artistData?.facebook?.trimEnd().toLowerCase()}`,
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
              style={styles.artistName}
              numberOfLines={(artistData?.artistName?.length ?? 0) < 20 ? 1 : 2}
              adjustsFontSizeToFit
            >
              {artistData?.artistName}
            </ThemeText>
          </View>

          <View style={styles.infoContainerMain}>
            <ThemeText type="subtitle">About</ThemeText>
            <Image source={{ uri: artistData?.picture }} style={styles.image} />

            <View style={styles.profileContainerSub}>
              <LabelWrapper label="Genre:">
                <ThemeText type="defaultSemiBold">
                  {getGenre(artistData?.genre || "All")}
                </ThemeText>
              </LabelWrapper>
              {artistData?.originalsCovers && (
                <LabelWrapper label="Music Type:">
                  <ThemeText type="defaultSemiBold">
                    {getType(artistData?.originalsCovers || "")}
                  </ThemeText>
                </LabelWrapper>
              )}
              {artistData?.instagram && (
                <LabelWrapper label="Instagram:">
                  <Pressable onPress={linkInstagram}>
                    <ThemeText type="link">{artistData?.instagram}</ThemeText>
                  </Pressable>
                </LabelWrapper>
              )}

              {artistData?.facebook && (
                <LabelWrapper label="Facebook:">
                  <Pressable onPress={linkFacebook}>
                    <ThemeText type="link">{artistData?.facebook}</ThemeText>
                  </Pressable>
                </LabelWrapper>
              )}
              <LabelWrapper label="Email:">
                <Pressable onPress={openEmail}>
                  <ThemeText type="link">{artistData?.email}</ThemeText>
                </Pressable>
              </LabelWrapper>

              <LabelWrapper label="Bio">
                <ThemeText type="defaultSemiBold">{artistData?.bio}</ThemeText>
              </LabelWrapper>
            </View>
            {!offerAccepted && (
              <>
                <TouchableOpacity
                  onPress={selectArtist}
                  style={styles.selectButton}
                >
                  <ThemeText
                    type="defaultSemiBold"
                    style={styles.selectButtonText}
                  >
                    Select This Artist
                  </ThemeText>
                </TouchableOpacity>
                <ThemeText type="caption">
                  Lock this artist in for your event. By proceeding you agree to{" "}
                  <TermsPrivacyLinks />
                </ThemeText>
              </>
            )}

            {offerAccepted && (
              <Pressable style={styles.selectButton}>
                <ThemeText
                  type="defaultSemiBold"
                  style={styles.selectButtonText}
                >
                  You have already selected this artist.
                </ThemeText>
              </Pressable>
            )}

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
    marginTop: 10,
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
  selectButton: {
    width: "100%",
    height: 60,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderRadius: 25,
  },
  selectButtonText: {
    color: "white",
  },
  artistName: {
    fontSize: 35,
    textAlign: "center",
  },
  report: {
    marginTop: 15,
  },
});
