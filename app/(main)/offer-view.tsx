//Navigates to this page after a user clicks 'View' on a bands profile. adds band ID to url to get specific data.
import { ArtistCell } from "@/components/artist-cell";
import { LabelWrapper } from "@/components/label-wrapper";
import Loading from "@/components/loading";
import { TermsPrivacyLinks } from "@/components/terms-privacy";
import { ThemeText } from "@/components/theme-text";
import { Artist } from "@/models/artist";
import { Offer } from "@/models/offer";
import { MockData } from "@/models/venue";
import { colors } from "@/utilities/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OfferView() {
  const navigator = useRouter();
  // Going to match the id to a band and get attributes so I don't pass them all through URL
  const { parentVenueId, offerId } = useLocalSearchParams<{
    parentVenueId: string;
    offerId: string;
  }>();
  // Find the band in the db that matches the id passed through the URL params
  const [offerData, setOfferData] = useState<Offer>();
  const [loading, setLoading] = useState(true);

  //This is the list of artists that have applied for the offer
  const [appliedArtistsData, setAppliedArtistsData] = useState<Artist[]>();

  //show error on failure
  const [error, setError] = useState("");

  //fetch the selected bands data
  const fetchvenue = useCallback(async () => {
    if (!parentVenueId || !offerId) return;

    const venue = MockData.venues.find((v) => v.id === parentVenueId);
    const offer = venue?.offers.find((o) => o.id === offerId);

    setOfferData(offer ? { ...offer, venue } : undefined);
    setLoading(false);
  }, [parentVenueId, offerId]);

  //fetch bands data on load
  useEffect(() => {
    fetchvenue();
  }, [fetchvenue]);

  //Get all of the artists on the offer object
  const appliedArtists = offerData?.appliedArtists ?? [];

  const openBookingForm = () => {
    console.log("Open booking form");
  };

  const openVenuePage = () => {
    navigator.navigate({
      pathname: "/venue-view",
      params: { id: parentVenueId },
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
              style={styles.venueNameStyle}
              numberOfLines={(offerData?.eventName.length ?? 0) < 20 ? 1 : 2}
              adjustsFontSizeToFit
            >
              {offerData?.eventName}
            </ThemeText>
          </View>

          <View style={styles.infoContainerMain}>
            <ThemeText type="subtitle">Info</ThemeText>
            <Image
              source={{ uri: offerData?.venue?.venueImage || "" }}
              style={styles.image}
            />

            <View style={styles.profileContainerSub}>
              <LabelWrapper label="Venue">
                <Pressable onPress={openVenuePage}>
                  <ThemeText type="link">
                    {offerData?.venue?.venueName}
                  </ThemeText>
                </Pressable>
              </LabelWrapper>

              <LabelWrapper label="Description">
                <ThemeText type="defaultSemiBold">
                  {offerData?.description}
                </ThemeText>
              </LabelWrapper>

              <LabelWrapper label="Address">
                <ThemeText type="defaultSemiBold">
                  {offerData?.venue?.address}
                </ThemeText>
              </LabelWrapper>

              <LabelWrapper label="State">
                <ThemeText type="defaultSemiBold">
                  {offerData?.venue?.state}
                </ThemeText>
              </LabelWrapper>
            </View>

            <View style={styles.contactContainer}>
              {/* THIS WILL NEED TO BE DYNAMIC IF CURRENT USER IS NOT A BAND */}
              <Pressable onPress={openBookingForm} style={styles.contactButton}>
                <ThemeText type="defaultSemiBold">Apply For Gig</ThemeText>
              </Pressable>

              <ThemeText type="caption">
                By proceeding to book you agree to GigDogs <TermsPrivacyLinks />
              </ThemeText>
              <Pressable onPress={handleReport} style={styles.report}>
                <ThemeText type="link">Report Offer</ThemeText>
              </Pressable>
            </View>

            {/* Bands that have applied for the offer */}
            <View>
              <ThemeText type="subtitle">Applied Bands</ThemeText>
              <FlatList
                data={appliedArtists}
                keyExtractor={(artist) => artist.id}
                renderItem={({ item }) => (
                  <ArtistCell
                    id={item.id}
                    name={item.bandName}
                    genre={item.genre}
                    picture={item.picture}
                  />
                )}
                keyboardShouldPersistTaps="always"
                style={styles.flatListContainer}
                ListEmptyComponent={
                  <View>
                    <ThemeText type="error">No bands have applied</ThemeText>
                  </View>
                }
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
