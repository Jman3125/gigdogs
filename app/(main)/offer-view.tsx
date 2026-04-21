//Navigates to this page after a user clicks 'View' on a bands profile. adds band ID to url to get specific data.
import { ArtistCell } from "@/components/artist-cell";
import { LabelWrapper } from "@/components/label-wrapper";
import Loading from "@/components/loading";
import { TermsPrivacyLinks } from "@/components/terms-privacy";
import { ThemeText } from "@/components/theme-text";
import { Artist } from "@/models/artist";
import { Offer } from "@/models/offer";
import { colors } from "@/utilities/colors";
import { applyToOffer } from "@/utilities/firebase/apply-offer";
import { getItemsByIds, getOneItem } from "@/utilities/firebase/fetch-data";
import { formatTimeRange } from "@/utilities/format-time-range";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OfferView() {
  const navigator = useRouter();
  // Going to match the id to a band and get attributes so I don't pass them all through URL
  const { offerId } = useLocalSearchParams<{
    offerId: string;
  }>();
  // Find the band in the db that matches the id passed through the URL params
  const [offerData, setOfferData] = useState<Offer | null>();
  const [loading, setLoading] = useState(true);

  //These are the applied artists on this offer
  const [artists, setArtists] = useState<Artist[]>([]);

  //fetch the selected bands data
  const populateData = useCallback(async () => {
    if (!offerId) return;

    const data = await getOneItem<Offer>(offerId, "offers");

    setOfferData(data);

    //Get all of the artists on the offer object
    const appliedArtists = offerData?.appliedArtistIds ?? [];

    const artistsData = await getItemsByIds<Artist>(appliedArtists, "users");
    setArtists(artistsData);

    try {
    } catch (error) {
      Alert.alert(
        "Error",
        "There was an error loading this offer. Please try again later.",
      );
    }
    setLoading(false);
  }, [offerId]);

  //fetch bands data on load
  useEffect(() => {
    populateData();
  }, [populateData]);

  const openBookingForm = () => {
    applyToOffer(offerId!)
      .then(() => {
        Alert.alert(
          "Success",
          "You have successfully applied to this offer! The venue will be notified and can view your profile and contact you through the information provided.",
        );
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const openVenuePage = () => {
    navigator.navigate({
      pathname: "/venue-view",
      params: { id: offerData?.parentVenueId },
    });
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
        <FlatList
          data={artists}
          keyExtractor={(artist) => artist.id}
          renderItem={({ item }) => (
            <ArtistCell
              id={item.id}
              name={item.artistName}
              genre={item.genre}
              picture={item.picture}
            />
          )}
          keyboardShouldPersistTaps="always"
          style={styles.flatListContainer}
          ListEmptyComponent={
            <View>
              <ThemeText type="error">No artists have applied</ThemeText>
            </View>
          }
          ListHeaderComponent={
            <View>
              <View style={styles.infoContainerMain}>
                <ThemeText type="subtitle">{offerData?.eventName}</ThemeText>

                <View style={styles.profileContainerSub}>
                  <LabelWrapper label="Venue">
                    <Pressable onPress={openVenuePage}>
                      <ThemeText type="link">
                        See venue details about {offerData?.eventName}
                      </ThemeText>
                    </Pressable>
                  </LabelWrapper>

                  <LabelWrapper label="Description">
                    <ThemeText type="defaultSemiBold">
                      {offerData?.description}
                    </ThemeText>
                  </LabelWrapper>

                  <LabelWrapper label="Amount">
                    <ThemeText type="defaultSemiBold">
                      {offerData?.offerAmount}
                    </ThemeText>
                  </LabelWrapper>

                  <LabelWrapper label="Date">
                    <ThemeText type="defaultSemiBold">
                      {offerData?.date &&
                        new Date(offerData.date).toLocaleDateString()}
                    </ThemeText>
                  </LabelWrapper>

                  <LabelWrapper label="Time">
                    <ThemeText type="defaultSemiBold">
                      {offerData?.time && formatTimeRange(offerData.time)}
                    </ThemeText>
                  </LabelWrapper>

                  <LabelWrapper label="Arrival Time">
                    <ThemeText type="defaultSemiBold">
                      {offerData?.arrivalTime &&
                        new Date(offerData.arrivalTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    </ThemeText>
                  </LabelWrapper>

                  <LabelWrapper label="Equipment Provided">
                    <ThemeText type="defaultSemiBold">
                      {offerData?.providedEquipment}
                    </ThemeText>
                  </LabelWrapper>

                  <LabelWrapper label="State">
                    <ThemeText type="defaultSemiBold">
                      {offerData?.state}
                    </ThemeText>
                  </LabelWrapper>
                </View>

                <View style={styles.contactContainer}>
                  {/* THIS WILL NEED TO BE DYNAMIC IF CURRENT USER IS NOT AN ARTIST */}
                  <Pressable
                    onPress={openBookingForm}
                    style={styles.contactButton}
                  >
                    <ThemeText type="defaultSemiBold">Apply For Gig</ThemeText>
                  </Pressable>

                  <ThemeText type="caption">
                    By proceeding to book you agree to GigDogs{" "}
                    <TermsPrivacyLinks />
                  </ThemeText>
                  <Pressable onPress={handleReport} style={styles.report}>
                    <ThemeText type="link">Report Offer</ThemeText>
                  </Pressable>
                </View>
              </View>
              <ThemeText type="subtitle">Applied Artists</ThemeText>
            </View>
          }
        />
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
  venueNameStyle: {
    fontSize: 35,
  },
  report: {
    marginTop: 15,
  },
  //This is for the applied bands on the offer
  flatListContainer: {
    flex: 1,
  },
});
