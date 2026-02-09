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

type Props = {
  city: string;
  setCity: (value: string) => void;
};

export default function SearchLocation({ city, setCity }: Props) {
  const [autocompleteCities, setAutocompleteCities] = useState<string[]>([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");

  const { fetchPlace } = useFetchPlace();

  const handleCityChange = async (text: string) => {
    setCity(text);

    if (!text.trim()) {
      setAutocompleteCities([]);
      return;
    }

    const res = await fetchPlace(text);

    if (res?.features) {
      setAutocompleteCities(
        res.features.map((place: { place_name: string }) => place.place_name),
      );
    }

    setAutocompleteErr(res?.error ?? "");
  };

  const handleSelect = (selectedCity: string) => {
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
