//This page is the offer view from a venue
import { ArtistCell } from "@/components/artist-cell";
import { LabelWrapper } from "@/components/label-wrapper";
import Loading from "@/components/loading";
import { TermsPrivacyLinks } from "@/components/terms-privacy";
import { ThemeText } from "@/components/theme-text";
import { auth } from "@/config/firebaseConfig";
import { useAuthWithRole } from "@/hooks/use-auth-state";
import { Artist } from "@/models/artist";
import { Offer } from "@/models/offer";
import { colors } from "@/utilities/colors";
import { applyToOffer } from "@/utilities/firebase/apply-offer";
import { getItemsByIds, getOneItem } from "@/utilities/firebase/fetch-data";
import { formatTimeRange } from "@/utilities/format-time-range";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OfferView() {
  const navigator = useRouter();
  // Going to match the id to an artist and get attributes so I don't pass them all through URL
  const { offerId } = useLocalSearchParams<{
    offerId: string;
  }>();
  // Find the artist in the db that matches the id passed through the URL params
  const [offerData, setOfferData] = useState<Offer | null>();

  //Empty state text for applied artists. If it's a venue, show that no artists have applied. If it's an artist or user not signed in, tell them only venues can see applied artists.
  const [emptyStateText, setEmptyStateText] = useState("");

  const [loading, setLoading] = useState(true);

  //These are the applied artists on this offer
  const [artists, setArtists] = useState<Artist[]>([]);

  //Track if the current artist has already applied
  const [hasApplied, setHasApplied] = useState(false);

  //Check if user is signed in and if they are an artist or venue to determine what actions they can take on this offer
  const { role, isSignedIn } = useAuthWithRole();

  //fetch the selected artists data
  const populateData = useCallback(async () => {
    setLoading(true);
    if (!offerId) {
      setLoading(false);
      return;
    }

    const data = await getOneItem<Offer>(offerId, "offers");

    setOfferData(data);

    // Check if current user has already applied
    const currentUser = auth.currentUser;
    if (currentUser && role === "artist" && data?.appliedArtistIds) {
      setHasApplied(data.appliedArtistIds.includes(currentUser.uid));
    }

    if (role === "venue" && currentUser?.uid === data?.parentVenueId) {
      setEmptyStateText("Artists that apply will display here.");
      //Get all of the artists on the offer object
      const appliedArtists = data?.appliedArtistIds ?? [];

      const artistsData = await getItemsByIds<Artist>(appliedArtists, "users");
      setArtists(artistsData);
    } else {
      setEmptyStateText(
        "Only this venue can see the list of artists that have applied.",
      );
    }

    try {
    } catch (error) {
      Alert.alert(
        "Error",
        "There was an error loading this offer. Please try again later.",
      );
    }
    setLoading(false);
  }, [offerId, role]);

  //fetch artists data on load
  useEffect(() => {
    populateData();
  }, [populateData]);

  const openBookingForm = async () => {
    if (!role) {
      Alert.alert("Error", "You must be signed in to apply to offers.");
      navigator.replace("/auth");
      return;
    }

    if (role !== "artist") {
      return;
    }

    try {
      setLoading(true);
      await applyToOffer(offerId!);
      Alert.alert(
        "Success",
        "You have successfully applied to this offer! The venue may contact you. Offers you have applied to will show up on your profile page.",
      );
      setLoading(false);
      navigator.back();
    } catch (error: any) {
      setLoading(false);
      Alert.alert("Error", error.message);
    }
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
        <>
          <FlatList
            data={artists}
            keyExtractor={(artist) => artist.id}
            renderItem={({ item }) => (
              <ArtistCell
                //Set this to the uid of the artist
                artistId={item.id}
                offerId={offerData?.id || ""}
                name={item.artistName}
                genre={item.genre}
                picture={item.picture}
              />
            )}
            keyboardShouldPersistTaps="always"
            style={styles.flatListContainer}
            ListEmptyComponent={
              <View style={styles.emptyStateContainer}>
                <ThemeText type="caption">{emptyStateText}</ThemeText>
              </View>
            }
            ListHeaderComponent={
              <View style={styles.main}>
                <ThemeText type="subtitle">Offer</ThemeText>

                <View style={styles.infoContainerMain}>
                  <ThemeText type="subtitle" style={{ textAlign: "center" }}>
                    {offerData?.eventName}
                  </ThemeText>

                  <View style={styles.profileContainerSub}>
                    <View style={styles.infoGrid}>
                      <View style={styles.verticalInfo}>
                        <LabelWrapper label="Amount">
                          {isSignedIn ? (
                            <ThemeText type="defaultSemiBold">
                              ${offerData?.offerAmount}
                            </ThemeText>
                          ) : (
                            <View style={styles.horizontalWrap}>
                              <FontAwesome
                                name="lock"
                                size={18}
                                color={colors.placeholder}
                              />
                              <ThemeText type="caption">Signup</ThemeText>
                            </View>
                          )}
                        </LabelWrapper>

                        <LabelWrapper label="Date">
                          <ThemeText type="defaultSemiBold">
                            {offerData?.date &&
                              new Date(offerData.date).toLocaleDateString()}
                          </ThemeText>
                        </LabelWrapper>
                      </View>
                      <View style={styles.verticalInfo}>
                        <LabelWrapper label="Arrival Time">
                          <ThemeText type="defaultSemiBold">
                            {offerData?.arrivalTime &&
                              new Date(
                                offerData.arrivalTime,
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                          </ThemeText>
                        </LabelWrapper>

                        <LabelWrapper label="Time">
                          <ThemeText type="defaultSemiBold">
                            {offerData?.time && formatTimeRange(offerData.time)}
                          </ThemeText>
                        </LabelWrapper>
                      </View>
                    </View>
                    <LabelWrapper label="Description">
                      <ThemeText type="defaultSemiBold">
                        {offerData?.description}
                      </ThemeText>
                    </LabelWrapper>

                    <LabelWrapper label="Equipment Provided">
                      <ThemeText type="defaultSemiBold">
                        {offerData?.providedEquipment}
                      </ThemeText>
                    </LabelWrapper>

                    {offerData?.extraNotes && (
                      <LabelWrapper label="Extra Notes">
                        <ThemeText type="defaultSemiBold">
                          {offerData?.extraNotes}
                        </ThemeText>
                      </LabelWrapper>
                    )}
                  </View>
                  {role === "artist" && offerData?.status === "accepted" && (
                    <View style={styles.accepted}>
                      <ThemeText type="defaultSemiBold">
                        You have been selected!
                      </ThemeText>

                      <ThemeText type="default">
                        This venue has approved your application. All
                        information is on this page. Contact the venue for
                        questions or contact support if you need to cancel.
                      </ThemeText>
                    </View>
                  )}
                  {/* User is not a venue, show apply for offer button */}
                  {!(role === "venue") && offerData?.status !== "accepted" && (
                    <View style={styles.contactContainer}>
                      <TouchableOpacity
                        onPress={openBookingForm}
                        disabled={hasApplied}
                        style={[styles.contactButton]}
                      >
                        <ThemeText type="defaultSemiBold">
                          {hasApplied ? "Applied" : "Apply For Gig"}
                        </ThemeText>
                      </TouchableOpacity>

                      <ThemeText type="caption">
                        By proceeding to apply you agree to GigDogs{" "}
                        <TermsPrivacyLinks />
                      </ThemeText>
                      <Pressable onPress={handleReport} style={styles.report}>
                        <ThemeText type="link">Report Offer</ThemeText>
                      </Pressable>
                    </View>
                  )}
                </View>
                <ThemeText type="subtitle">
                  {offerData?.status === "open"
                    ? `Applied Artists: ${offerData?.appliedArtistIds.length}`
                    : "Locked In"}
                </ThemeText>

                {role === "venue" && (
                  <>
                    <ThemeText type="caption" style={styles.listTop}>
                      {offerData?.status === "open"
                        ? "Select an artist for this event"
                        : "Artist has been notified."}
                    </ThemeText>
                  </>
                )}
              </View>
            }
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    padding: 15,
  },
  main: {
    alignItems: "center",
    gap: 10,
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
    gap: 15,
  },
  //This holds infor about times and price
  infoGrid: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgb(236, 236, 236)",
    padding: 10,
    borderRadius: 10,
    // iOS
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    // Android
    elevation: 6,
  },
  verticalInfo: {
    flexDirection: "column",
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
  accepted: {
    width: "100%",
    backgroundColor: "rgba(96, 192, 99, 0.86)",
    borderRadius: 8,

    padding: 10,
  },
  horizontalWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
  appliedButton: {
    backgroundColor: "#cccccc",
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
  //This is for the applied artists on the offer
  flatListContainer: {
    flex: 1,
    marginBottom: 25,
  },

  emptyStateContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    marginTop: 15,
    marginBottom: 25,
  },

  listTop: {
    marginBottom: 15,
  },
});
