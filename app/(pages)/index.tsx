import { AccountMain } from "@/components/account-main";
import { BandDisplay } from "@/components/band-display";
import { ThemeText } from "@/components/theme-text";
import { bandsModel } from "@/models/band";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const navigator = useRouter();
  const [signedIn, updateSignedIn] = useState(false);

  function signIn() {
    // Placeholder sign-in function
    navigator.navigate("/(pages)/(authenticate)/signup");
    updateSignedIn(true);
  }

  function logout() {
    updateSignedIn(false);
  }

  return (
    <SafeAreaView style={styles.viewContainer}>
      <FlatList
        data={bandsModel}
        keyExtractor={(band) => band.id}
        renderItem={({ item: band }) => (
          <BandDisplay
            id={band.id}
            name={band.name}
            genre={band.genre}
            minPrice={band.pricePerHour}
            picture={band.picture}
            isUser={false}
          />
        )}
        ListHeaderComponent={
          <>
            {/* Need to guard this account section so it only displays if user logged in */}
            {signedIn && (
              <>
                <AccountMain />
                <Button title="Logout" onPress={() => logout()} />
              </>
            )}

            {!signedIn && (
              <>
                <Button title="Add Band" onPress={() => signIn()} />
              </>
            )}

            <ThemeText type="title" style={{ marginTop: 20 }}>
              Find Bands
            </ThemeText>
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
});
