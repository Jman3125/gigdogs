import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle>PRIVACY POLICY</SectionTitle>
      <BodyText>Effective Date: May 02, 2026</BodyText>

      <SectionTitle>1. INTRODUCTION</SectionTitle>
      <BodyText>
        This Privacy Policy describes how GigDogs (the “App”), operated by Jack
        Manfredi (“Company,” “we,” “us,” or “our”), collects, uses, and protects
        information from users (“Users,” including Artists and Venues). By using
        the App, you agree to the collection and use of information in
        accordance with this Privacy Policy.
      </BodyText>

      <SectionTitle>2. INFORMATION WE COLLECT</SectionTitle>

      <SubTitle>2.1 Information Provided by Artists</SubTitle>
      <BodyText>Artists may provide the following information:</BodyText>
      <BulletList
        items={[
          "Name",
          "Email address",
          "Genre",
          "Artist type",
          "Biography",
          "Profile picture",
          "Social media links (Facebook, Instagram)",
          "Phone number",
        ]}
      />

      <SubTitle>2.2 Information Provided by Venues</SubTitle>
      <BodyText>Venues may provide the following information:</BodyText>
      <BulletList
        items={[
          "Name",
          "Profile picture",
          "State and physical address",
          "Email address",
          "Phone number",
          "Website",
          "Social media links (Instagram, Facebook)",
        ]}
      />

      <SubTitle>2.3 Offer Information</SubTitle>
      <BodyText>Venues may create Offers that include:</BodyText>
      <BulletList
        items={[
          "Event name",
          "Date",
          "Start time, arrival time, and end time",
          "Description",
          "Provided equipment",
          "Additional notes",
        ]}
      />

      <SubTitle>2.4 User-Provided Content</SubTitle>
      <BodyText>
        All information collected through the App is provided directly by Users.
        We do not independently verify this information.
      </BodyText>

      <SectionTitle>3. HOW WE USE INFORMATION</SectionTitle>
      <BodyText>We use the information collected to:</BodyText>
      <BulletList
        items={[
          "Operate and maintain the App",
          "Display Artist and Venue profiles to other Users",
          "Publish Offers and facilitate applications",
          "Enable communication and booking between Users",
          "Improve App functionality and user experience",
        ]}
      />

      <SectionTitle>4. DATA STORAGE AND SECURITY</SectionTitle>

      <SubTitle>3.1 To Provide and Improve the App</SubTitle>
      <BulletList
        items={[
          "Creating and managing User accounts",
          "Enabling Artists and Venues to interact, apply to Offers, and complete bookings",
          "Improving App performance, reliability, and usability",
        ]}
      />

      <SubTitle>3.2 To Facilitate Offers and Bookings</SubTitle>
      <BulletList
        items={[
          "Allowing Venues to create Offers",
          "Allowing Artists to view, apply to, and accept Offers",
          "Enabling Venues to select Artists for events",
        ]}
      />

      <SubTitle>3.3 To Communicate With Users</SubTitle>
      <BulletList
        items={[
          "Sending confirmations, updates, and notifications",
          "Providing customer support",
          "Responding to inquiries",
        ]}
      />

      <SubTitle>3.4 To Maintain Safety and Integrity</SubTitle>
      <BulletList
        items={[
          "Detecting and preventing fraud or misuse",
          "Enforcing our Terms of Service",
          "Ensuring a safe and trustworthy platform",
        ]}
      />

      <SectionTitle>5. INFORMATION SHARING</SectionTitle>

      <SubTitle>5.1 No Sale of Data</SubTitle>
      <BodyText>
        We do not sell, rent, or trade User personal information to third
        parties.
      </BodyText>

      <SubTitle>5.2 Limited Sharing</SubTitle>
      <BodyText>We do not share User data with third parties except:</BodyText>
      <BulletList
        items={[
          "As necessary to operate the App through Firebase",
          "When required by law or legal process",
        ]}
      />

      <SubTitle>5.3 Public Information</SubTitle>
      <BodyText>
        Certain User information (such as profiles and Offers) is visible to
        other Users within the App.
      </BodyText>

      <SubTitle>5.4 With Other Users</SubTitle>
      <BulletList
        items={[
          "When a Venue selects an Artist, the Artist’s email and phone number may be shared with the Venue as part of the booking process.",
          "When an Artist applies to an Offer, the Venue may view the Artist’s profile information.",
        ]}
      />

      <SubTitle>5.5 With Service Providers</SubTitle>
      <BodyText>
        We may share information with third-party service providers who assist
        with:
      </BodyText>
      <BulletList
        items={["Hosting and infrastructure", "Authentication", "Data storage"]}
      />
      <BodyText>
        These providers are authorized to use information only as necessary to
        provide services to us.
      </BodyText>

      <SubTitle>5.6 For Legal Compliance</SubTitle>
      <BulletList
        items={[
          "Comply with applicable laws",
          "Respond to legal requests",
          "Protect the rights, safety, or property of the App, Users, or others",
        ]}
      />

      <SectionTitle>6. DATA RETENTION</SectionTitle>
      <BodyText>
        We retain User information for as long as necessary to operate the App
        and fulfill its purposes, unless a longer retention period is required
        or permitted by law.
      </BodyText>

      <SectionTitle>7. USER RIGHTS AND CHOICES</SectionTitle>
      <BodyText>Users may:</BodyText>
      <BulletList
        items={[
          "Update or correct their account information within the App",
          "Remove applications before acceptance (as applicable under the Terms and Conditions)",
          "Request account deletion by contacting us",
        ]}
      />
      <BodyText>
        We will make reasonable efforts to honor such requests, subject to legal
        and operational requirements.
      </BodyText>

      <BodyText>
        Depending on your location, you may have the following rights regarding
        your information:
      </BodyText>

      <SubTitle>7.1 Access and Correction</SubTitle>
      <BodyText>
        You may request access to or correction of your personal information.
      </BodyText>

      <SubTitle>7.2 Deletion</SubTitle>
      <BodyText>
        You may request deletion of your account or personal data, subject to
        legal or operational requirements.
      </BodyText>

      <SubTitle>7.4 Data Portability</SubTitle>
      <BodyText>
        You may request a copy of your data in a portable format.
      </BodyText>

      <SubTitle>7.5 Withdraw Consent</SubTitle>
      <BodyText>
        Where applicable, you may withdraw consent for data processing at any
        time.
      </BodyText>

      <SubTitle>7.6 Limitations</SubTitle>
      <BodyText>
        Certain data (such as Offer history or booking records) may be retained
        for legitimate business or legal purposes.
      </BodyText>

      <SectionTitle>8. CHILDREN’S PRIVACY</SectionTitle>
      <BodyText>
        The App is not intended for individuals under the age of 13. We do not
        knowingly collect personal information from children under 13.
      </BodyText>

      <SectionTitle>9. CHANGES TO THIS PRIVACY POLICY</SectionTitle>
      <BodyText>
        We may update this Privacy Policy from time to time. Continued use of
        the App after changes are posted constitutes acceptance of the revised
        policy.
      </BodyText>

      <SectionTitle>10. CONTACT INFORMATION</SectionTitle>
      <BodyText>
        If you have any questions about this Privacy Policy or our data
        practices, please contact:
      </BodyText>
      <BodyText>Jack Manfredi</BodyText>
      <BodyText>gigdogscontact@gmail.com</BodyText>
    </ScrollView>
  );
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.subTitle}>{children}</Text>
);

const BodyText = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.body}>{children}</Text>
);

const BulletList = ({ items }: { items: string[] }) => (
  <View style={styles.listContainer}>
    {items.map((item, index) => (
      <View key={index} style={styles.listItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.listText}>{item}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
  listContainer: {
    marginVertical: 4,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  bullet: {
    fontSize: 14,
    marginRight: 6,
    lineHeight: 20,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
