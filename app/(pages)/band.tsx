//Navigates to this page after a user clicks 'See More' on a bands profile
import { ThemeText } from "@/components/theme-text";
import { bandsModel } from "@/models/band";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Band() {
  const navigator = useRouter();

  // Going to match the id to a band and get attributes so I don't pass them all through URL
  const { id } = useLocalSearchParams();

  const matched = bandsModel.find((item) => item.id === id);

  return (
    <SafeAreaView style={styles.viewContainer}>
      <ScrollView>
        <Button onPress={() => navigator.back()} title="Go Back" />
        <ThemeText type="default">Band Name: {matched?.bandName}</ThemeText>
        <ThemeText type="default">Genre: {matched?.genre}</ThemeText>
        <ThemeText type="default">
          Minimum Price: {matched?.pricePerHour}
        </ThemeText>
        <ThemeText type="default">Instagram: {matched?.instagram}</ThemeText>
        <ThemeText type="default">Set Time: {matched?.setTime.hours}</ThemeText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    padding: 15,
  },
});
