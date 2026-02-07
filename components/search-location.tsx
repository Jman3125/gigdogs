import { StyleSheet, TextInput } from "react-native";
import { LabelWrapper } from "./label-wrapper";

//A input field that autocompletes a list of available cities in the world based on users input.

type SearchLocationProps = {
  location: string;
  setLocation: (value: string) => void;
};

export function SearchLocation(props: SearchLocationProps) {
  const { location, setLocation } = props;
  return (
    <LabelWrapper label="Location">
      <TextInput
        id="city-input"
        placeholder="Enter a city"
        style={styles.input}
        value={location}
        onChangeText={(value) => {
          setLocation(value);
        }}
      />
    </LabelWrapper>
  );
}

const styles = StyleSheet.create({
  input: { height: 40, padding: 5, borderWidth: 1, color: "black" },
});
