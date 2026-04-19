//Signed in bands booking offers page
import { ThemeText } from "@/components/theme-text";
import { colors } from "@/utilities/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  const navigator = useRouter();
  const openModal = () => {
    navigator.navigate("/venue/create-offer");
  };
  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView>
        <Pressable style={styles.createEventButton} onPress={openModal}>
          <ThemeText type="subtitle">Create Offer</ThemeText>
          <FontAwesome name="plus" size={34} color={"black"}></FontAwesome>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  createEventButton: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    width: "100%",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
  },
  input: {
    height: 50,
    width: "100%",
    padding: 8,
    color: "black",
    backgroundColor: "white",
    borderRadius: 10,
  },
});
