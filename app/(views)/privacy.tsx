import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>PRIVACY POLICY</Text>
      <Text style={styles.meta}>Effective Date: April 23, 2026</Text>

      {/* 1. INTRODUCTION */}
      <SectionTitle>1. INTRODUCTION</SectionTitle>
      <BodyText>
        This Privacy Policy describes how GigDogs (the “App”), operated by Jack
        Manfredi (“Company,” “we,” “us,” or “our”), collects, uses, and protects
        information from users (“Users,” including Artists and Venues). By using
        the App, you agree to the collection and use of information in
        accordance with this Privacy Policy.
      </BodyText>

      {/* 2. INFORMATION WE COLLECT */}
      <SectionTitle>2. INFORMATION WE COLLECT</SectionTitle>

      <SubTitle>2.1 Information Provided by Artists</SubTitle>
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

      {/* 3. HOW WE USE INFORMATION */}
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

      {/* 4. DATA STORAGE AND SECURITY */}
      <SectionTitle>4. DATA STORAGE AND SECURITY</SectionTitle>
      <BodyText>
        User data is stored using Firebase infrastructure. We implement
        reasonable administrative and technical safeguards to protect
        information; however, no method of transmission or storage is completely
        secure, and we cannot guarantee absolute security.
      </BodyText>

      {/* 5. INFORMATION SHARING */}
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

      {/* 6. DATA RETENTION */}
      <SectionTitle>6. DATA RETENTION</SectionTitle>
      <BodyText>
        We retain User information for as long as necessary to operate the App
        and fulfill its purposes, unless a longer retention period is required
        or permitted by law.
      </BodyText>

      {/* 7. USER RIGHTS AND CHOICES */}
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

      {/* 8. CHILDREN’S PRIVACY */}
      <SectionTitle>8. CHILDREN’S PRIVACY</SectionTitle>
      <BodyText>
        The App is not intended for individuals under the age of 13. We do not
        knowingly collect personal information from children under 13.
      </BodyText>

      {/* 9. CHANGES TO THIS PRIVACY POLICY */}
      <SectionTitle>9. CHANGES TO THIS PRIVACY POLICY</SectionTitle>
      <BodyText>
        We may update this Privacy Policy from time to time. Continued use of
        the App after changes are posted constitutes acceptance of the revised
        policy.
      </BodyText>

      {/* 10. CONTACT INFORMATION */}
      <SectionTitle>10. CONTACT INFORMATION</SectionTitle>
      <BodyText>If you have any questions about this Privacy Policy:</BodyText>
      <BodyText>Jack Manfredi</BodyText>
      <BodyText>Email: gigdogscontact@gmail.com</BodyText>

      {/* IMPORTANT NOTICE */}
      <SectionTitle>IMPORTANT NOTICE</SectionTitle>
      <BodyText>
        This Privacy Policy is a general template and must be reviewed and
        approved by a licensed attorney to ensure compliance with applicable
        privacy laws and regulations.
      </BodyText>
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
