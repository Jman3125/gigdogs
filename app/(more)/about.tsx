//About GigDogs page
import { LabelWrapper } from "@/components/label-wrapper";
import LogoTitle from "@/components/logo-title";
import { TermsPrivacyLinks } from "@/components/terms-privacy";
import { ThemeText } from "@/components/theme-text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { Linking, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About() {
  const navigator = useRouter();

  const handleEmail = () => {
    Linking.openURL(`mailto:gigdogscontact@gmail.com`);
  };

  const linkInstagram = () => {
    Linking.openURL(`https://instagram.com/gig_dogs`);
  };
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView>
        <Stack.Screen
          options={{
            headerTitle: () => <LogoTitle />,
            headerLeft: () => (
              <Pressable
                style={styles.headerButton}
                onPress={() => navigator.back()}
              >
                <Ionicons name="chevron-back" size={24} color="white" />
                <ThemeText type="default" style={styles.headerText}>
                  Back
                </ThemeText>
              </Pressable>
            ),
          }}
        />
        <View style={styles.infoContainer}>
          <ThemeText type="logo">Welcome to GigDogs</ThemeText>
          <View style={styles.section}>
            <ThemeText type="subtitle">What is it?</ThemeText>
            <ThemeText type="defaultSemiBold">
              GigDogs is an app that makes live music more accessible to the
              everyday person.
            </ThemeText>
            <ThemeText type="default">
              {
                "People love live music, and there should be no reason musicians and music lovers shouldn't be able to connect in a simple and meaningful way."
              }
            </ThemeText>
          </View>

          <View style={styles.section}>
            <ThemeText type="subtitle">Our Goal</ThemeText>
            <ThemeText type="defaultSemiBold">
              Our goal is to foster connection.
            </ThemeText>
            <ThemeText type="default">
              {
                "We want live music to be at every party and event. We aim to be a platform that stays out of the way and lets anyone hire amazing musicians. No middleman. No booking agencies. Hassle-free."
              }
            </ThemeText>
          </View>

          <View style={styles.section}>
            <ThemeText type="subtitle">{"Who's it for?"}</ThemeText>
            <ThemeText type="defaultSemiBold">Communities.</ThemeText>
            <ThemeText type="default">
              {
                "College parties, community events, backyard cookouts. GigDogs is for musicians who just want to play and for people who just want a simple and centralized way to find a local band for their party."
              }
            </ThemeText>
          </View>

          <View style={styles.section}>
            <LabelWrapper label="Please send us any feedback!">
              <Pressable onPress={handleEmail}>
                <ThemeText type="link">Contact Us</ThemeText>
              </Pressable>
            </LabelWrapper>

            <ThemeText type="defaultSemiBold">
              <LabelWrapper label="Follow us on Instagram">
                <Pressable onPress={() => linkInstagram()}>
                  <ThemeText type="link">gig_dogs</ThemeText>
                </Pressable>
              </LabelWrapper>
            </ThemeText>
          </View>

          <View style={styles.section}>
            <ThemeText type="subtitle">Welcome!</ThemeText>
          </View>

          <ThemeText type="default">
            View our <TermsPrivacyLinks />
          </ThemeText>
        </View>
      </ScrollView>
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
