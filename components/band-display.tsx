import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ThemeText } from "./theme-text";

type Band = {
  id: string;
  picture: string;
  name: string;
  genre: string;
  minPrice: number;
  isUser: boolean;
};

export function BandDisplay({
  id,
  name,
  genre,
  minPrice,
  picture,
  isUser,
}: Band) {
  return (
    <View style={styles.container}>
      {/* Change the element if it's the signed in bands layout being displayed */}
      {isUser && (
        <>
          <ThemeText type="defaultSemiBold">Your Name: {name}</ThemeText>
          <ThemeText type="default">Type: {genre}</ThemeText>
          <ThemeText type="default">Minimum Price: {minPrice}</ThemeText>
          <Link href="./account">
            <ThemeText type="link">Edit Account</ThemeText>
          </Link>
        </>
      )}

      {/* This is not the users band, used to display all bands for viewing */}
      {!isUser && (
        <>
          <ThemeText type="defaultSemiBold">Name: {name}</ThemeText>
          <ThemeText type="default">Type: {genre}</ThemeText>
          <ThemeText type="default">Minimum Price: {minPrice}</ThemeText>
          <Link
            href={{
              pathname: "/band",
              params: { id: id },
            }}
          >
            <ThemeText type="link">See More</ThemeText>
          </Link>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 5,
    marginBottom: 15,
    borderWidth: 1.5,
    borderRadius: 10,
  },
});
