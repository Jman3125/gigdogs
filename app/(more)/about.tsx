import LogoTitle from "@/components/logo-title";
import { TermsPrivacyLinks } from "@/components/terms-privacy";
import { ThemeText } from "@/components/theme-text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About() {
  const navigator = useRouter();

  const handleEmail = () => {
    Linking.openURL(`mailto:gigdogscontact@gmail.com`);
  };
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Stack.Screen
        options={{
          headerTitle: () => <LogoTitle />,
          headerLeft: () => (
            <Pressable
              style={styles.headerButton}
              onPress={() => navigator.back()}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
              <ThemeText type="defaultSemiBold" style={styles.headerText}>
                Back
              </ThemeText>
            </Pressable>
          ),
        }}
      />
      <View style={styles.infoContainer}>
        <ThemeText type="title">Gig Dogs</ThemeText>
        <View style={styles.section}>
          <ThemeText type="subtitle">What is it?</ThemeText>
          <ThemeText type="defaultSemiBold">
            Gig Dogs is an app that makes live music more accessible to the
            everyday person.
          </ThemeText>
          <ThemeText type="default">
            {`People love live music, and there should be no reason musicians and
            music lovers shouldn't be able to connect in a simple and meaningful
            way.`}
          </ThemeText>
        </View>

        <View style={styles.section}>
          <ThemeText type="subtitle">Our Goal</ThemeText>
          <ThemeText type="defaultSemiBold">
            Our goal is to foster the connection.
          </ThemeText>
          <ThemeText type="default">
            {`We believe that there is no reason live music shouldn't be at every
            party and event. We aim to provide a convenient way to help artists
            connect with hosts looking to bring music to their event.`}
          </ThemeText>
        </View>

        <View style={styles.section}>
          <Pressable onPress={handleEmail}>
            <ThemeText type="link">Contact Us</ThemeText>
          </Pressable>
          <ThemeText type="defaultSemiBold">
            Follow us on instagram: gig_dogs
          </ThemeText>
        </View>

        <View style={styles.section}>
          <ThemeText type="subtitle">Welcome!</ThemeText>
        </View>

        <ThemeText type="default">
          View our <TermsPrivacyLinks />
        </ThemeText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  headerButton: {
    alignItems: "center",
    marginRight: 10,
    flexDirection: "row",
  },
  headerText: {
    color: "white",
  },

  infoContainer: {
    flexDirection: "column",
    alignItems: "baseline",
  },
  section: {
    marginTop: 20,
  },
});
