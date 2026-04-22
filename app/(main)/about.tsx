//About GigDogs page
import { LabelWrapper } from "@/components/label-wrapper";
import { TermsPrivacyLinks } from "@/components/terms-privacy";
import { ThemeText } from "@/components/theme-text";
import { colors } from "@/utilities/colors";
import { FontAwesome } from "@expo/vector-icons";
import { Linking, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About() {
  const handleEmail = () => {
    Linking.openURL(`mailto:gigdogscontact@gmail.com`);
  };

  const linkInstagram = () => {
    Linking.openURL(`https://instagram.com/gig_dogs`);
  };
  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView>
        <View style={styles.infoContainer}>
          <ThemeText type="logoLarge">GigDogs</ThemeText>
          <View style={styles.section}>
            <ThemeText type="logo">What is it?</ThemeText>
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
            <ThemeText type="logo">Our Goal</ThemeText>
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
            <ThemeText type="logo">{"Who's it for?"}</ThemeText>
            <ThemeText type="defaultSemiBold">Communities.</ThemeText>
            <ThemeText type="default">
              {
                "College parties, community events, backyard cookouts. GigDogs is for musicians who just want to play and for people who just want a simple and centralized way to find a local band for their party."
              }
            </ThemeText>
          </View>

          <View style={styles.section}>
            <LabelWrapper label="Please send us any feedback!">
              <View style={styles.horizontalWrap}>
                <FontAwesome name="send" size={22} color={"rgb(31, 31, 31)"} />
                <Pressable onPress={handleEmail}>
                  <ThemeText type="link">Contact Us</ThemeText>
                </Pressable>
              </View>
            </LabelWrapper>

            <ThemeText type="defaultSemiBold">
              <LabelWrapper label="Follow us on Instagram">
                <View style={styles.horizontalWrap}>
                  <FontAwesome name="instagram" size={22} color={"black"} />
                  <Pressable onPress={() => linkInstagram()}>
                    <ThemeText type="link">gig_dogs</ThemeText>
                  </Pressable>
                </View>
              </LabelWrapper>
            </ThemeText>
          </View>

          <View style={styles.section}>
            <ThemeText type="subtitle">Welcome!</ThemeText>
            <ThemeText type="default">
              View our <TermsPrivacyLinks />
            </ThemeText>
          </View>
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
    alignItems: "center",
  },
  section: {
    marginTop: 20,
    padding: 15,
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 5,
    // iOS
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    // Android
    elevation: 6,
  },
  horizontalWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
