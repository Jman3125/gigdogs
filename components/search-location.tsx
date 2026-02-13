//A text field where users can search for a city with autocomplete.
import { useFetchPlace } from "@/hooks/use-fetch-place";
import { colors } from "@/utilities/colors";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeText } from "./theme-text";

//To pass from parent view
type Props = {
  city: string;
  setCity: (value: string) => void;
};

export default function SearchLocation({ city, setCity }: Props) {
  //Used for autocomplete population
  const [autocompleteCities, setAutocompleteCities] = useState<string[]>([]);
  //If error fetching cities
  const [autocompleteErr, setAutocompleteErr] = useState("");

  //Fetch place api hook
  const { fetchPlace } = useFetchPlace();

  //User is searching, update the state variable
  const handleCityChange = async (text: string) => {
    setCity(text);
    //ensure string is not empty
    if (!text.trim()) {
      setAutocompleteCities([]);
      return;
    }

    //get the response from hook
    const res = await fetchPlace(text);

    //if there is a return from hook
    if (res?.features) {
      //Populate autocomplete cities to matching names. Opens dropdown
      setAutocompleteCities(
        res.features.map((place: { place_name: string }) => place.place_name),
      );
    }
    //if error
    setAutocompleteErr(res?.error ?? "");
  };

  //User selected a city from the dropdown.
  const handleSelect = (selectedCity: string) => {
    //set the text field value
    setCity(selectedCity);
    setAutocompleteCities([]); // close dropdown
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={city}
        onChangeText={handleCityChange}
        placeholder="Enter city"
        placeholderTextColor={colors.placeholder}
        style={styles.input}
      />

      {autocompleteCities.length > 0 && (
        <FlatList
          data={autocompleteCities}
          keyExtractor={(item, index) => index.toString()}
          style={styles.dropdown}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={styles.item}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
        />
      )}

      {autocompleteErr ? (
        <ThemeText type="error">{autocompleteErr}</ThemeText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 25,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginTop: 5,
  },

  dropdown: {
    marginTop: 5,
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "white",
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  error: {
    color: "red",
    marginTop: 5,
  },
});
