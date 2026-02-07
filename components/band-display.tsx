import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ThemeText } from "./theme-text";

type Props = {
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
}: Props) {
  return (
    <View style={styles.container}>
      <ThemeText type="defaultSemiBold">Your Name: {name}</ThemeText>
      <ThemeText type="default">Type: {genre}</ThemeText>
      <ThemeText type="default">Minimum Price: {minPrice}</ThemeText>

      {/* Change the action button if it's the signed in bands layout being displayed */}
      {isUser && (
        <Link href="./account">
          <ThemeText type="link">Edit Account</ThemeText>
        </Link>
      )}
      {/* This is not the users band, used action button for all other bands*/}
      {!isUser && (
        <Link
          href={{
            pathname: "/band-view",
            params: { id: id },
          }}
        >
          <ThemeText type="link">See More</ThemeText>
        </Link>
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
