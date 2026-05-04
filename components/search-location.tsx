//A text field where users can search for a city with autocomplete.
import { useFetchStates } from "@/hooks/use-fetch-states";
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
  state: string;
  setState: (value: string) => void;
};

export default function SearchLocation({ state, setState }: Props) {
  //Used for autocomplete population
  const [autocompleteCities, setAutocompleteCities] = useState<string[]>([]);
  //If error fetching cities
  const [autocompleteErr, setAutocompleteErr] = useState("");

  //Fetch place api hook
  const { fetchStates } = useFetchStates();

  //User is searching, update the state variable
  const handleCityChange = async (text: string) => {
    setState(text);
    //ensure string is not empty
    if (!text.trim()) {
      setAutocompleteCities([]);
      setAutocompleteErr("");
      return;
    }

    //get the response from hook
    const res = fetchStates(text);

    setAutocompleteCities(res);
    if (res.length === 0) {
      setAutocompleteErr("No states found");
    } else {
      setAutocompleteErr("");
    }
  };

  //User selected a city from the dropdown.
  const handleSelect = (selectedCity: string) => {
    //set the text field value
    setState(selectedCity);
    setAutocompleteCities([]); // close dropdown
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={state}
        onChangeText={handleCityChange}
        placeholder="Search States"
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
        <ThemeText type="default">No States Found</ThemeText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
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
