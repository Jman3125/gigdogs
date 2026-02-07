import { StyleSheet, TextInput, View } from "react-native";
import { LabelWrapper } from "./label-wrapper";
import { SearchLocation } from "./search-location";
import { ThemeText } from "./theme-text";

type QueryDisplayProps = {
  location: string;
  setLocation: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
};

export function QueryDisplay(props: QueryDisplayProps) {
  const { location, setLocation, price, setPrice } = props;
  return (
    <View style={styles.container}>
      <ThemeText type="subtitle">Search Filters</ThemeText>

      <SearchLocation location={location} setLocation={setLocation} />
      <LabelWrapper label="Minimum Price">
        <View style={styles.priceContainer}>
          <ThemeText>$</ThemeText>
          <TextInput
            placeholder="15"
            inputMode="numeric"
            style={styles.input}
            placeholderTextColor={"#464141cb"}
            value={price}
            onChangeText={(value) => {
              setPrice(value);
            }}
          />
        </View>
      </LabelWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6d6c6c86",
    borderRadius: 10,
    padding: 15,
    marginTop: 25,
    marginBottom: 25,
  },
  priceContainer: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    height: 40,
    padding: 5,
    borderWidth: 1,
    color: "black",
  },
});
