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
              GigDogs is an app that makes live music easier for venues and
              artists of any type.
            </ThemeText>
            <ThemeText type="default">
              {
                "GigDogs cuts out the cold calls, the planning, and the headaches, putting everything in one place so the whole experience feels fun and effortless."
              }
            </ThemeText>
          </View>

          <View style={styles.section}>
            <ThemeText type="logo">Our Goal</ThemeText>
            <ThemeText type="defaultSemiBold">
              Our goal is the community.
            </ThemeText>
            <ThemeText type="default">
              {
                "We help venues find incredible local talent and help artists land more gigs, all hassle-free. GigDogs is made by the community, for the community."
              }
            </ThemeText>
          </View>

          <View style={styles.section}>
            <ThemeText type="logo">{"Who's it for?"}</ThemeText>
            <ThemeText type="defaultSemiBold">Communities.</ThemeText>
            <ThemeText type="default">
              {
                "From bars and nightclubs to backyard events, GigDogs makes finding the right act effortless. It’s for musicians who want to play and for people who want one simple place to book everything."
              }
            </ThemeText>
          </View>

          <View style={styles.section}>
            <LabelWrapper label="Please send us any feedback!">
              <View style={styles.horizontalWrap}>
                <FontAwesome name="send" size={22} color={"rgb(31, 31, 31)"} />
                <Pressable onPress={handleEmail}>
                  <ThemeText type="link">Contact us</ThemeText>
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
