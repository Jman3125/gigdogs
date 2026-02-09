import LogoTitle from "@/components/logo-title";
import { ThemeText } from "@/components/theme-text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Privacy() {
  const navigator = useRouter();
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
              <ThemeText type="defaultSemiBold">Back</ThemeText>
            </Pressable>
          ),
        }}
      />
      <View style={{ padding: 20, gap: 12 }}>
        <ThemeText type="title">PRIVACY POLICY</ThemeText>

        <ThemeText type="default">Effective Date: 2/9/2026</ThemeText>

        <ThemeText type="default">
          {`This Privacy Policy describes how Gig Dogs, owned and operated by
          Jacomo Manfredi, Sole Proprietor ("Gig Dogs," "we," "us," or "our"),
          collects, uses, and discloses information when you use the Gig Dogs
          mobile application (the "Platform").`}
        </ThemeText>

        <ThemeText type="default">
          By using Gig Dogs, you agree to the collection and use of information
          in accordance with this Privacy Policy.
        </ThemeText>

        {/* 1. Eligibility */}
        <ThemeText type="subtitle">1. Eligibility</ThemeText>
        <ThemeText type="default">
          Gig Dogs is intended for individuals 18 years of age or older. We do
          not knowingly collect personal information from anyone under 18.
        </ThemeText>

        {/* 2. Information We Collect */}
        <ThemeText type="subtitle">2. Information We Collect</ThemeText>

        <ThemeText type="subtitle">A. Information Provided by Bands</ThemeText>
        <ThemeText type="default">
          When bands create an account, we collect and display the following
          information:
        </ThemeText>

        <ThemeText type="default">• Band name</ThemeText>
        <ThemeText type="default">• Photos</ThemeText>
        <ThemeText type="default">• Biography</ThemeText>
        <ThemeText type="default">• Music genre</ThemeText>
        <ThemeText type="default">• Location</ThemeText>
        <ThemeText type="default">
          • Instagram or other social media links
        </ThemeText>
        <ThemeText type="default">• Phone number</ThemeText>
        <ThemeText type="default">• Email address</ThemeText>
        <ThemeText type="default">• Price per hour</ThemeText>
        <ThemeText type="default">• Total set time</ThemeText>

        <ThemeText type="default">
          By submitting this information, bands consent to its public display
          within the Platform.
        </ThemeText>

        <ThemeText type="subtitle">B. Information Provided by Users</ThemeText>
        <ThemeText type="default">
          Users who browse the Platform may provide limited information such as:
        </ThemeText>

        <ThemeText type="default">• Search location data</ThemeText>
        <ThemeText type="default">
          {`• Communications sent through the app (if applicable)`}
        </ThemeText>

        <ThemeText type="subtitle">
          C. Automatically Collected Information
        </ThemeText>
        <ThemeText type="default">
          We may automatically collect certain technical information when the
          Platform is used, including:
        </ThemeText>

        <ThemeText type="default">• Device type</ThemeText>
        <ThemeText type="default">• Operating system</ThemeText>
        <ThemeText type="default">• App usage data</ThemeText>
        <ThemeText type="default">• IP address</ThemeText>
        <ThemeText type="default">• Log data</ThemeText>
        <ThemeText type="default">
          {`• Approximate location (if enabled)`}
        </ThemeText>

        <ThemeText type="default">
          This information helps us improve functionality and security.
        </ThemeText>

        {/* 3. How We Use Information */}
        <ThemeText type="subtitle">3. How We Use Information</ThemeText>
        <ThemeText type="default">We use collected information to:</ThemeText>

        <ThemeText type="default">
          • Operate and maintain the Platform
        </ThemeText>
        <ThemeText type="default">• Display band profiles</ThemeText>
        <ThemeText type="default">• Improve user experience</ThemeText>
        <ThemeText type="default">• Respond to inquiries</ThemeText>
        <ThemeText type="default">• Monitor usage trends</ThemeText>
        <ThemeText type="default">• Prevent fraud or misuse</ThemeText>
        <ThemeText type="default">• Enforce our Terms and Conditions</ThemeText>

        {/* 4. Public Information */}
        <ThemeText type="subtitle">4. Public Information</ThemeText>
        <ThemeText type="default">
          All information submitted by bands for profile creation is intended
          for public display within the app.
        </ThemeText>

        <ThemeText type="default">
          This includes phone numbers and email addresses. Bands voluntarily
          provide this information with the understanding that it will be
          visible to users.
        </ThemeText>

        <ThemeText type="default">
          Gig Dogs is not responsible for how third parties use publicly
          displayed information.
        </ThemeText>

        {/* 5. How We Share Information */}
        <ThemeText type="subtitle">5. How We Share Information</ThemeText>
        <ThemeText type="default">
          We do not sell personal information.
        </ThemeText>

        <ThemeText type="default">We may share information:</ThemeText>

        <ThemeText type="default">
          {`• With service providers who assist in operating the Platform (e.g.,
          hosting providers)`}
        </ThemeText>
        <ThemeText type="default">
          • If required by law, subpoena, or legal process
        </ThemeText>
        <ThemeText type="default">
          • To protect our rights, property, or safety
        </ThemeText>
        <ThemeText type="default">
          {`• In connection with a business transfer (e.g., sale of the app)`}
        </ThemeText>

        {/* 6. No Responsibility for Third-Party Communications */}
        <ThemeText type="subtitle">
          6. No Responsibility for Third-Party Communications
        </ThemeText>

        <ThemeText type="default">Gig Dogs is not responsible for:</ThemeText>

        <ThemeText type="default">
          • Communications between users and bands
        </ThemeText>
        <ThemeText type="default">• Misuse of contact information</ThemeText>
        <ThemeText type="default">
          • Spam, harassment, or unsolicited contact
        </ThemeText>
        <ThemeText type="default">
          • Any disputes arising from shared information
        </ThemeText>

        <ThemeText type="default">
          {`All communication outside the Platform is at the user’s own risk.`}
        </ThemeText>

        {/* 7. Data Retention */}
        <ThemeText type="subtitle">7. Data Retention</ThemeText>
        <ThemeText type="default">We retain information:</ThemeText>

        <ThemeText type="default">
          • For as long as an account remains active
        </ThemeText>
        <ThemeText type="default">
          • As necessary to comply with legal obligations
        </ThemeText>
        <ThemeText type="default">
          • As needed to resolve disputes or enforce agreements
        </ThemeText>

        <ThemeText type="default">
          Bands may request deletion of their account and associated data by
          contacting us.
        </ThemeText>

        {/* 8. Data Security */}
        <ThemeText type="subtitle">8. Data Security</ThemeText>
        <ThemeText type="default">
          We implement reasonable technical and administrative safeguards to
          protect information. However, no system is completely secure.
        </ThemeText>

        <ThemeText type="default">
          We cannot guarantee absolute security of data transmitted through the
          internet.
        </ThemeText>

        {/* 9. Your Rights */}
        <ThemeText type="subtitle">{`9. Your Rights (United States)`}</ThemeText>
        <ThemeText type="default">
          Depending on your state of residence, you may have rights to:
        </ThemeText>

        <ThemeText type="default">
          • Request access to personal information
        </ThemeText>
        <ThemeText type="default">
          • Request correction of inaccurate information
        </ThemeText>
        <ThemeText type="default">
          • Request deletion of personal information
        </ThemeText>
        <ThemeText type="default">
          {`• Opt out of certain data uses (where applicable)`}
        </ThemeText>

        <ThemeText type="default">
          To exercise these rights, contact us using the information below.
        </ThemeText>

        {/* 10. Third-Party Links */}
        <ThemeText type="subtitle">10. Third-Party Links</ThemeText>
        <ThemeText type="default">
          {`The Platform may contain links to third-party websites (e.g.,
          Instagram). We are not responsible for the privacy practices of
          third-party sites.`}
        </ThemeText>

        {/* 11. Changes */}
        <ThemeText type="subtitle">11. Changes to This Policy</ThemeText>
        <ThemeText type="default">
          We may update this Privacy Policy from time to time. Updates will be
          posted within the app with a revised effective date.
        </ThemeText>

        <ThemeText type="default">
          Continued use of the Platform after changes constitutes acceptance of
          the revised policy.
        </ThemeText>

        {/* 12. Contact */}
        <ThemeText type="subtitle">12. Contact Information</ThemeText>
        <ThemeText type="default">Gig Dogs</ThemeText>
        <ThemeText type="default">Owner: Jacomo Manfredi</ThemeText>
        <ThemeText type="default">Email: gigdogscontact@gmail.com</ThemeText>

        <ThemeText type="default">
          By using Gig Dogs, you acknowledge that you have read and understood
          this Privacy Policy.
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
});
