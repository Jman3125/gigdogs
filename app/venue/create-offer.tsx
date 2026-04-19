//Create offer modal
import { LabelWrapper } from "@/components/label-wrapper";
import { ThemeText } from "@/components/theme-text";
import { colors } from "@/utilities/colors";
import { useState } from "react";

import { useCreateOffer } from "@/hooks/use-create-offer";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Modal() {
  const { create } = useCreateOffer();
  //For date of event
  const [date, setDate] = useState(new Date());

  //For time of event
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  //For arrival time of event
  const [arrival, setArrival] = useState(new Date());

  //For offer amount
  const [offerAmount, setOfferAmount] = useState("");

  //For description
  const [description, setDescription] = useState("");

  //Provided Equipment by the Venue
  const [providedEquipment, setProvidedEquipment] = useState("");

  //Extra Notes (optional)
  const [extraNotes, setExtraNotes] = useState("");

  const submit = async () => {
    create(
      date,
      startTime,
      endTime,
      arrival,
      offerAmount,
      description,
      providedEquipment,
      extraNotes,
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <ThemeText type="subtitle">Create Offer</ThemeText>

          <LabelWrapper label="Date">
            <DateTimePicker
              value={date}
              mode={"date"}
              is24Hour={true}
              onChange={() => setDate(date)}
            />
          </LabelWrapper>
          <LabelWrapper label="Start Time">
            <DateTimePicker
              value={startTime}
              mode={"time"}
              is24Hour={true}
              onChange={() => setStartTime(startTime)}
            />
          </LabelWrapper>
          <LabelWrapper label="End Time">
            <DateTimePicker
              value={endTime}
              mode={"time"}
              is24Hour={true}
              onChange={() => setEndTime(endTime)}
            />
          </LabelWrapper>
          <LabelWrapper label="Arrival Time">
            <DateTimePicker
              value={arrival}
              mode={"time"}
              is24Hour={true}
              onChange={() => setArrival(arrival)}
            />
          </LabelWrapper>

          <LabelWrapper label="Offer Amount">
            <TextInput
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

          <Pressable style={styles.signupButton} onPress={() => submit()}>
            <ThemeText type="defaultSemiBold">Submit</ThemeText>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginBottom: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: "100%",
    height: 50,
    borderRadius: 15,
  },
});
