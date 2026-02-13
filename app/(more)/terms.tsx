import LogoTitle from "@/components/logo-title";
import { ThemeText } from "@/components/theme-text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About() {
  const navigator = useRouter();
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
                <ThemeText style={styles.headerText} type="defaultSemiBold">
                  Back
                </ThemeText>
              </Pressable>
            ),
          }}
        />
        <View style={{ padding: 20, gap: 12 }}>
          <ThemeText type="title">TERMS AND CONDITIONS</ThemeText>

          <ThemeText type="default">Effective Date: 2/9/2026</ThemeText>

          <ThemeText type="default">Welcome to GigDogs.</ThemeText>

          <ThemeText type="default">
            {
              'These Terms and Conditions ("Terms") govern your access to and use of the GigDogs mobile application and any related services (collectively, the "Platform").'
            }
          </ThemeText>

          <ThemeText type="default">
            {
              'GigDogs is owned and operated by Jacomo Manfredi, a sole proprietor ("GigDogs," "we," "us," or "our").'
            }
          </ThemeText>

          <ThemeText type="default">
            By accessing or using GigDogs, you agree to be bound by these Terms.
            If you do not agree, do not use the Platform.
          </ThemeText>

          {/* 1. Eligibility */}
          <ThemeText type="subtitle">1. Eligibility</ThemeText>
          <ThemeText type="default">
            GigDogs is intended solely for individuals who are 18 years of age
            or older. By using the Platform, you represent and warrant that you
            are at least 18 years old.
          </ThemeText>

          {/* 2. Nature of the Platform */}
          <ThemeText type="subtitle">2. Nature of the Platform</ThemeText>
          <ThemeText type="default">
            GigDogs is a listing and discovery platform that allows musical
            bands to create profiles and publish information including, but not
            limited to:
          </ThemeText>

          <ThemeText type="default">• Band name</ThemeText>
          <ThemeText type="default">• Photos</ThemeText>
          <ThemeText type="default">• Biography</ThemeText>
          <ThemeText type="default">• Music genre</ThemeText>
          <ThemeText type="default">• Location</ThemeText>
          <ThemeText type="default">
            • Instagram or social media links
          </ThemeText>
          <ThemeText type="default">• Phone number</ThemeText>
          <ThemeText type="default">• Email address</ThemeText>
          <ThemeText type="default">• Price per hour</ThemeText>
          <ThemeText type="default">• Total set time</ThemeText>

          <ThemeText type="default">
            GigDogs does not employ, manage, supervise, control, or endorse any
            band listed on the Platform.
          </ThemeText>

          <ThemeText type="default">
            GigDogs does not book performances, negotiate contracts, process
            payments, or participate in any agreements between users and bands.
          </ThemeText>

          <ThemeText type="default">
            GigDogs acts solely as a passive platform for information display.
          </ThemeText>

          {/* 3. No Responsibility */}
          <ThemeText type="subtitle">
            3. No Responsibility for Band Performance or Events
          </ThemeText>

          <ThemeText type="default">GigDogs is not responsible for:</ThemeText>

          <ThemeText type="default">
            {"• The quality of any band’s performance"}
          </ThemeText>
          <ThemeText type="default">• Cancellation of performances</ThemeText>
          <ThemeText type="default">• No-shows</ThemeText>
          <ThemeText type="default">• Property damage</ThemeText>
          <ThemeText type="default">• Personal injury</ThemeText>
          <ThemeText type="default">• Theft</ThemeText>
          <ThemeText type="default">• Misconduct</ThemeText>
          <ThemeText type="default">
            • Disputes between users and bands
          </ThemeText>
          <ThemeText type="default">• Pricing disagreements</ThemeText>
          <ThemeText type="default">• Contract disputes</ThemeText>
          <ThemeText type="default">• Unsatisfactory experiences</ThemeText>
          <ThemeText type="default">• Safety issues at events</ThemeText>
          <ThemeText type="default">
            • Any outcome arising from a booking
          </ThemeText>

          <ThemeText type="default">
            All bookings, communications, negotiations, and agreements occur
            entirely outside the Platform and are solely between the user and
            the band.
          </ThemeText>

          <ThemeText type="default">
            You use the Platform at your own risk.
          </ThemeText>

          {/* 4. No Guarantee of Accuracy */}
          <ThemeText type="subtitle">4. No Guarantee of Accuracy</ThemeText>

          <ThemeText type="default">GigDogs does not guarantee:</ThemeText>

          <ThemeText type="default">• The accuracy of band profiles</ThemeText>
          <ThemeText type="default">
            • That contact information is correct
          </ThemeText>
          <ThemeText type="default">• That pricing is accurate</ThemeText>
          <ThemeText type="default">• That availability is accurate</ThemeText>
          <ThemeText type="default">
            • That communications will be delivered or received
          </ThemeText>
          <ThemeText type="default">• That any band will respond</ThemeText>

          <ThemeText type="default">
            Bands are solely responsible for the information they provide.
          </ThemeText>

          {/* 5. Independent Parties */}
          <ThemeText type="subtitle">5. Independent Parties</ThemeText>
          <ThemeText type="default">
            All bands are independent third parties and are not employees,
            contractors, agents, partners, or representatives of GigDogs.
          </ThemeText>
          <ThemeText type="default">
            Nothing in these Terms creates a partnership, joint venture, or
            employment relationship.
          </ThemeText>

          {/* 6. Assumption of Risk */}
          <ThemeText type="subtitle">6. Assumption of Risk</ThemeText>
          <ThemeText type="default">
            By using GigDogs, you acknowledge that hiring live performers
            involves inherent risks, including but not limited to:
          </ThemeText>

          <ThemeText type="default">• Equipment failure</ThemeText>
          <ThemeText type="default">• Crowd-related incidents</ThemeText>
          <ThemeText type="default">• Injury</ThemeText>
          <ThemeText type="default">• Alcohol-related incidents</ThemeText>
          <ThemeText type="default">• Venue-related hazards</ThemeText>
          <ThemeText type="default">• Event disruption</ThemeText>

          <ThemeText type="default">
            You voluntarily assume all risks associated with contacting, hiring,
            or interacting with any band listed on the Platform.
          </ThemeText>

          {/* 7. Release and Waiver */}
          <ThemeText type="subtitle">
            7. Release and Waiver of Liability
          </ThemeText>
          <ThemeText type="default">
            To the fullest extent permitted by law, you release and hold
            harmless Jacomo Manfredi and GigDogs from any and all claims,
            damages, liabilities, losses, costs, and expenses arising out of or
            related to:
          </ThemeText>

          <ThemeText type="default">
            • Any interaction between users and bands
          </ThemeText>
          <ThemeText type="default">
            • Any event at which a band performs
          </ThemeText>
          <ThemeText type="default">• Any communication errors</ThemeText>
          <ThemeText type="default">• Any failure of performance</ThemeText>
          <ThemeText type="default">
            • Any injury, loss, or damage of any kind
          </ThemeText>

          <ThemeText type="default">
            {"GigDogs’ total liability, if any, shall not exceed $100."}
          </ThemeText>

          {/* 8. Indemnification */}
          <ThemeText type="subtitle">8. Indemnification</ThemeText>
          <ThemeText type="default">
            {
              "You agree to indemnify, defend, and hold harmless Jacomo Manfredi and GigDogs from any claims, lawsuits, damages, losses, liabilities, or expenses (including attorney’s fees) arising out of:"
            }
          </ThemeText>

          <ThemeText type="default">• Your use of the Platform</ThemeText>
          <ThemeText type="default">• Your booking of a band</ThemeText>
          <ThemeText type="default">• Your event</ThemeText>
          <ThemeText type="default">• Your violation of these Terms</ThemeText>
          <ThemeText type="default">• Content you submit or publish</ThemeText>

          {/* 9. Band Content */}
          <ThemeText type="subtitle">9. Band Content and License</ThemeText>
          <ThemeText type="default">
            By creating an account, bands grant GigDogs a non-exclusive,
            worldwide, royalty-free license to display, reproduce, and
            distribute the information and content they upload for the purpose
            of operating and promoting the Platform.
          </ThemeText>

          <ThemeText type="default">
            Bands represent that they have the right to upload all content
            submitted.
          </ThemeText>

          <ThemeText type="default">
            GigDogs reserves the right to remove any content at its sole
            discretion.
          </ThemeText>

          {/* 10. Prohibited Conduct */}
          <ThemeText type="subtitle">10. Prohibited Conduct</ThemeText>
          <ThemeText type="default">Users and bands may not:</ThemeText>

          <ThemeText type="default">
            • Submit false or misleading information
          </ThemeText>
          <ThemeText type="default">• Harass other users</ThemeText>
          <ThemeText type="default">
            • Use the Platform for unlawful purposes
          </ThemeText>
          <ThemeText type="default">
            • Upload infringing or illegal content
          </ThemeText>
          <ThemeText type="default">
            • Attempt to hack, disrupt, or interfere with the Platform
          </ThemeText>

          <ThemeText type="default">
            GigDogs may suspend or terminate access at any time.
          </ThemeText>

          {/* 11. Account Termination */}
          <ThemeText type="subtitle">11. Account Termination</ThemeText>
          <ThemeText type="default">
            GigDogs reserves the right to suspend or permanently terminate any
            account for any reason, including violation of these Terms.
          </ThemeText>

          {/* 12. No Warranty */}
          <ThemeText type="subtitle">12. No Warranty</ThemeText>
          <ThemeText type="default">
            {
              'The Platform is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied.'
            }
          </ThemeText>

          <ThemeText type="default">
            GigDogs disclaims all warranties, including:
          </ThemeText>

          <ThemeText type="default">• Merchantability</ThemeText>
          <ThemeText type="default">
            • Fitness for a particular purpose
          </ThemeText>
          <ThemeText type="default">• Non-infringement</ThemeText>
          <ThemeText type="default">• Reliability</ThemeText>
          <ThemeText type="default">• Availability</ThemeText>

          <ThemeText type="default">
            We do not guarantee uninterrupted or error-free service.
          </ThemeText>

          {/* 13. Governing Law */}
          <ThemeText type="subtitle">13. Governing Law</ThemeText>
          <ThemeText type="default">
            These Terms shall be governed by and construed in accordance with
            the laws of the Commonwealth of Virginia, without regard to conflict
            of law principles.
          </ThemeText>

          <ThemeText type="default">
            Any legal action must be filed exclusively in courts located in
            Virginia.
          </ThemeText>

          {/* 14. Changes */}
          <ThemeText type="subtitle">14. Changes to Terms</ThemeText>
          <ThemeText type="default">
            GigDogs may update these Terms at any time. Continued use of the
            Platform after changes constitutes acceptance of the revised Terms.
          </ThemeText>

          {/* 15. Contact */}
          <ThemeText type="subtitle">15. Contact Information</ThemeText>
          <ThemeText type="default">GigDogs</ThemeText>
          <ThemeText type="default">Owner: Jacomo Manfredi</ThemeText>
          <ThemeText type="default">Email: gigdogscontact@gmail.com</ThemeText>

          <ThemeText type="default">
            By using GigDogs, you acknowledge that you have read, understood,
            and agreed to these Terms and Conditions.
          </ThemeText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  headerButton: {
    alignItems: "center",
    marginRight: 10,
    flexDirection: "row",
  },
  headerText: {
    color: "white",
  },
});
