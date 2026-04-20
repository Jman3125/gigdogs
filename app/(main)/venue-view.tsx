//Navigates to this page after a user clicks 'View' on a bands profile. adds band ID to url to get specific data.
import { LabelWrapper } from "@/components/label-wrapper";
import Loading from "@/components/loading";
import { OfferCell } from "@/components/offer-cell";
import { ThemeText } from "@/components/theme-text";
import { Offer } from "@/models/offer";
import { Venue } from "@/models/venue";
import { getItemsByIds, getOneItem } from "@/utilities/firebase/fetch-data";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VenueView() {
  // Going to match the id to a band and get attributes so I don't pass them all through URL
  const { id } = useLocalSearchParams<{ id: string }>();
  // Find the band in the db that matches the id passed through the URL params
  const [venue, setData] = useState<Venue | null>();
  const [loading, setLoading] = useState(true);

  //Hold the offfers for this venue
  const [venueOffers, setVenueOffers] = useState<Offer[]>([]);

  //fetch the selected bands data
  const fetchvenue = useCallback(async () => {
    try {
      const data = await getOneItem<Venue>(id, "venues");
      setData(data);
      //Offers this venue has
      //Get all of the artists on the offer object
      if (data?.offerIds && data.offerIds.length > 0) {
        const offerData = await getItemsByIds<Offer>(data.offerIds, "offers");
        setVenueOffers(offerData);
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert(
        "Error",
        "Failed to fetch venue data. Please try again later.",
      );
    }
  }, [id]);

  //fetch bands data on load
  useEffect(() => {
    fetchvenue();
  }, [fetchvenue]);

  const openEmail = () => {
    Linking.openURL(`mailto:${venue?.email}?subject=GigDogs Booking Inquiry`);
  };

  //Open venues instagram account
  const linkInstagram = () => {
    Linking.openURL(
      `https://instagram.com/${venue?.instagram?.trimEnd().toLowerCase()}`,
    );
  };
  //open venues facebook account
  const linkFacebook = () => {
    Linking.openURL(
      `https://instagram.com/${venue?.instagram?.trimEnd().toLowerCase()}`,
    );
  };

  //Open venues website
  const linkWebsite = () => {
    Linking.openURL(
      `https://instagram.com/${venue?.instagram?.trimEnd().toLowerCase()}`,
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
        <FlatList
          data={venueOffers}
          keyExtractor={(offer) => offer.id}
          renderItem={({ item }) => (
            <OfferCell
              parentVenueId={venue?.id || ""}
              offerId={item.id}
              name={venue?.venueName || ""}
              date={item.date}
              time={item.time}
              offerAmount={item.offerAmount}
              //Just get the length of applied artists
              artistsApplied={item.appliedArtistIds.length}
            />
          )}
          keyboardShouldPersistTaps="always"
          style={styles.flatListContainer}
          ListEmptyComponent={
            <View>
              <ThemeText type="error">This venue has no offers</ThemeText>
            </View>
          }
          ListHeaderComponent={
            <View>
              <View style={styles.headerContainer}>
                <ThemeText
                  type="title"
                  style={styles.venueNameStyle}
                  numberOfLines={(venue?.venueName?.length ?? 0) < 20 ? 1 : 2}
                  adjustsFontSizeToFit
                >
                  {venue?.venueName}
                </ThemeText>
              </View>

              <View style={styles.infoContainerMain}>
                <ThemeText type="subtitle">Info</ThemeText>
                <Image
                  source={{ uri: venue?.venueImage }}
                  style={styles.image}
                />

                <View style={styles.profileContainerSub}>
                  <LabelWrapper label="Phone:">
                    <ThemeText type="defaultSemiBold">
                      ${venue?.phone}
                    </ThemeText>
                  </LabelWrapper>

                  <LabelWrapper label="Email:">
                    <Pressable onPress={openEmail}>
                      <ThemeText type="defaultSemiBold">
                        ${venue?.email}
                      </ThemeText>
                    </Pressable>
                  </LabelWrapper>

                  {venue?.instagram && (
                    <LabelWrapper label="Instagram:">
                      <Pressable onPress={linkInstagram}>
                        <ThemeText type="link">{venue?.instagram}</ThemeText>
                      </Pressable>
                    </LabelWrapper>
                  )}
                  {venue?.facebook && (
                    <LabelWrapper label="Facebook:">
                      <Pressable onPress={linkFacebook}>
                        <ThemeText type="link">{venue?.facebook}</ThemeText>
                      </Pressable>
                    </LabelWrapper>
                  )}
                  {venue?.website && (
                    <LabelWrapper label="Website:">
                      <Pressable onPress={linkWebsite}>
                        <ThemeText type="link">{venue?.website}</ThemeText>
                      </Pressable>
                    </LabelWrapper>
                  )}

                  <LabelWrapper label="State">
                    <ThemeText type="defaultSemiBold">{venue?.state}</ThemeText>
                  </LabelWrapper>

                  <LabelWrapper label="Address">
                    <ThemeText type="defaultSemiBold">
                      {venue?.address}
                    </ThemeText>
                  </LabelWrapper>
                </View>

                <Pressable onPress={handleReport} style={styles.report}>
                  <ThemeText type="link">Report Account</ThemeText>
                </Pressable>
              </View>
              <ThemeText type="subtitle">Offers from this Venue</ThemeText>
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

  //For list of offers the venue has
  flatListContainer: {
    flex: 1,
  },
});
