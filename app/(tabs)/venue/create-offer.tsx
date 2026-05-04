//Create offer modal
import IconInput from "@/components/icon-input";
import { LabelWrapper } from "@/components/label-wrapper";
import Loading from "@/components/loading";
import { TermsPrivacyLinks } from "@/components/terms-privacy";
import { ThemeText } from "@/components/theme-text";
import { auth } from "@/config/firebaseConfig";
import { useCreateOffer } from "@/hooks/use-create-offer";
import { colors } from "@/utilities/colors";
import { fetchAuthVenue } from "@/utilities/firebase/fetch-auth-venue";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Analytics from "expo-firebase-analytics";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Modal() {
  const { create } = useCreateOffer();

  //For nav
  const navigator = useRouter();

  //loading state
  const [loading, setLoading] = useState(true);

  //Error
  const [error, setError] = useState("");

  //Default to Venue name
  const [eventName, setEventName] = useState("");

  //For date of event
  const [date, setDate] = useState(new Date());

  //For time of event
  const [startTime, setStartTime] = useState(() => {
    const now = new Date();
    now.setHours(now.getHours() + 1, 0, 0, 0);
    return now;
  });
  const [endTime, setEndTime] = useState(() => {
    const now = new Date();
    now.setHours(now.getHours() + 2, 0, 0, 0);
    return now;
  });

  //For arrival time of event
  const [arrival, setArrival] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    return now;
  });

  //For offer amount
  const [offerAmount, setOfferAmount] = useState("");

  //For description
  const [description, setDescription] = useState("");

  //Provided Equipment by the Venue
  const [providedEquipment, setProvidedEquipment] = useState("");

  //Extra Notes (optional)
  const [extraNotes, setExtraNotes] = useState("");

  // fetch signed in venues data
  const fetchAuthVenueData = async (uid: string) => {
    const venue = await fetchAuthVenue(uid);
    return venue;
  };

  //On page load fetch data and set up auth listener to update signed-in state. Cleanup listener on unmount.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const venueAuthData = await fetchAuthVenueData(user.uid);
        //Populate venue name
        setEventName(venueAuthData?.venueName);

        //Log that an offer form has been opened
        await Analytics.logEvent("offer_creation_started", {
          uid: auth?.currentUser?.uid,
        });

        setLoading(false);
      } else {
        Alert.alert("Error", "User not authenticated. Please reset the app.");
        setEventName("");
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const submit = async () => {
    setLoading(true);
    try {
      await create(
        eventName,
        date,
        startTime,
        endTime,
        arrival,
        offerAmount,
        description,
        providedEquipment,
        extraNotes,
      );
      navigator.dismissAll();
      setLoading(false);
      Alert.alert(
        "Success!",
        "Your offer is now public, all updates will display on your account page",
      );
    } catch (error: any) {
      setLoading(false);
      Alert.alert("Error", error.message);
      setError(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      {loading && <Loading />}

      {!loading && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <ThemeText type="subtitle">Create Offer</ThemeText>

            {/* Name of the event, defaults to venue name */}
            <LabelWrapper label="Event Name">
              <TextInput
                style={styles.input}
                value={eventName}
                onChangeText={(value) => {
                  setEventName(value);
                }}
              />
            </LabelWrapper>

            <LabelWrapper label="Important Information">
              <View style={styles.horizontalSelectionSection}>
                <View style={styles.verticalSelectionSection}>
                  <LabelWrapper label="Arrival Time" color="white">
                    <DateTimePicker
                      value={arrival}
                      mode={"time"}
                      is24Hour={true}
                      accentColor="white"
                      onChange={(event, selectedTime) =>
                        setArrival(selectedTime || arrival)
                      }
                    />
                  </LabelWrapper>
                  <LabelWrapper label="Start Time" color="white">
                    <DateTimePicker
                      value={startTime}
                      mode={"time"}
                      is24Hour={true}
                      accentColor="white"
                      onChange={(event, selectedTime) =>
                        setStartTime(selectedTime || startTime)
                      }
                    />
                  </LabelWrapper>
                </View>

                <View style={styles.verticalSelectionSection}>
                  <LabelWrapper label="Gig Date" color="white">
                    <DateTimePicker
                      value={date}
                      mode={"date"}
                      is24Hour={true}
                      accentColor="white"
                      onChange={(event, selectedDate) =>
                        setDate(selectedDate || date)
                      }
                    />
                  </LabelWrapper>
                  <LabelWrapper label="End Time" color="white">
                    <DateTimePicker
                      value={endTime}
                      mode={"time"}
                      is24Hour={true}
                      accentColor="white"
                      onChange={(event, selectedTime) =>
                        //IF a user interacts with this, they are probably starting an offer creation, log it
                        setEndTime(selectedTime || endTime)
                      }
                    />
                  </LabelWrapper>
                </View>
              </View>
            </LabelWrapper>

            <LabelWrapper
              label="Offer Amount"
              footnote="This will only be shown to authenticated artists"
            >
              <IconInput
                icon="dollar"
                placeholder="Amount"
                style={styles.input}
                placeholderTextColor={colors.placeholder}
                inputMode="numeric"
                value={offerAmount}
                onChangeText={(value) => {
                  setOfferAmount(value);
                }}
              />
            </LabelWrapper>
            <LabelWrapper label="Event Details" footnote="Max Length: 280">
              <TextInput
                placeholder="Looking for high-energy bands or acoustic acts? Describe your events details to get the right artists to apply."
                multiline
                numberOfLines={5}
                maxLength={280}
                style={styles.multiline}
                placeholderTextColor={colors.placeholder}
                value={description}
                onChangeText={(value) => {
                  setDescription(value);
                }}
              />
            </LabelWrapper>

            <LabelWrapper label="Provided Equipment" footnote="Max Length: 100">
              <TextInput
                placeholder="In-house sound system, Mic Stands, e.t.c."
                multiline
                numberOfLines={3}
                maxLength={100}
                style={styles.multiline}
                placeholderTextColor={colors.placeholder}
                value={providedEquipment}
                onChangeText={(value) => {
                  setProvidedEquipment(value);
                }}
              />
            </LabelWrapper>

            <LabelWrapper
              label="Extra Notes (optional)"
              footnote="Max Length: 200"
            >
              <TextInput
                placeholder="Notes"
                multiline
                numberOfLines={3}
                maxLength={150}
                style={styles.multiline}
                placeholderTextColor={colors.placeholder}
                value={extraNotes}
                onChangeText={(value) => {
                  setExtraNotes(value);
                }}
              />
            </LabelWrapper>

            {error ? <ThemeText type="error">{error}</ThemeText> : null}

            <View>
              <Pressable style={styles.signupButton} onPress={() => submit()}>
                <ThemeText type="defaultSemiBold" style={{ color: "white" }}>
                  Post Offer
                </ThemeText>
              </Pressable>

              <ThemeText type="caption">
                Posted offers are public. See <TermsPrivacyLinks /> before
                continuing
              </ThemeText>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  input: {
    height: 50,
    width: "100%",
    padding: 8,
    color: "black",
    backgroundColor: "white",
    borderRadius: 10,
  },

  multiline: {
    height: 100,
    padding: 10,
    color: "black",
    backgroundColor: "white",
    borderRadius: 10,
  },

  signupButton: {
    marginTop: 25,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: "100%",
    height: 50,
    borderRadius: 15,
  },

  horizontalSelectionSection: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 25,
    // iOS
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    // Android
    elevation: 6,
  },

  verticalSelectionSection: {
    flexDirection: "column",
  },
});
