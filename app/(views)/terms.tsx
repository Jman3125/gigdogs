import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function TermsAndConditionsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>TERMS AND CONDITIONS</Text>
      <Text style={styles.meta}>Effective Date: April 23, 2026</Text>

      {/* 1. INTRODUCTION */}
      <SectionTitle>1. INTRODUCTION</SectionTitle>
      <BodyText>
        These Terms and Conditions (“Terms”) govern the use of the live music
        hiring application GigDogs (the “App”) operated by Jack Manfredi
        (“Company,” “we,” “us,” or “our”). By accessing or using the App, users
        (“Users,” including both artists and venues) agree to be bound by these
        Terms.
      </BodyText>

      {/* 2. DESCRIPTION OF SERVICES */}
      <SectionTitle>2. DESCRIPTION OF SERVICES</SectionTitle>
      <BodyText>
        GigDogs provides a platform that connects musical artists (“Artists”)
        with venues (“Venues”) for the purpose of booking live performances.
        Venues may create and publish performance opportunities (“Offers”), and
        Artists may apply to such Offers.
      </BodyText>

      {/* 3. USER ACCOUNTS AND INFORMATION COLLECTION */}
      <SectionTitle>3. USER ACCOUNTS AND INFORMATION COLLECTION</SectionTitle>

      <SubTitle>3.1 Artist Information</SubTitle>
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

      <SubTitle>3.2 Venue Information</SubTitle>
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

      <SubTitle>3.3 Accuracy of Information</SubTitle>
      <BodyText>
        All Users represent and warrant that the information they provide is
        accurate, complete, and current. The Company is not responsible for
        verifying User-provided information.
      </BodyText>

      {/* 4. DATA STORAGE */}
      <SectionTitle>4. DATA STORAGE</SectionTitle>
      <BodyText>
        All User data is stored using Firebase infrastructure. The Company does
        not currently share User data with third parties beyond this service
        provider. Users acknowledge and agree that data storage is subject to
        Firebase’s systems and security practices.
      </BodyText>

      {/* 5. OFFERS AND APPLICATIONS */}
      <SectionTitle>5. OFFERS AND APPLICATIONS</SectionTitle>

      <SubTitle>5.1 Offer Creation</SubTitle>
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
      <BodyText>All Offers are displayed publicly within the App.</BodyText>

      <SubTitle>5.2 Compensation Visibility</SubTitle>
      <BodyText>
        Compensation details associated with Offers are visible only to
        authenticated Users.
      </BodyText>

      <SubTitle>5.3 Applications by Artists</SubTitle>
      <BodyText>
        Artists may apply to Offers. By applying, an Artist represents that they
        are available and willing to perform:
      </BodyText>
      <BulletList
        items={[
          "On the specified date",
          "At the specified times",
          "For the specified compensation",
        ]}
      />

      {/* 6. BOOKING AND BINDING AGREEMENT */}
      <SectionTitle>6. BOOKING AND BINDING AGREEMENT</SectionTitle>

      <SubTitle>6.1 Venue Acceptance</SubTitle>
      <BodyText>
        When a Venue selects an Artist for an Offer, the Venue agrees to all
        terms and details provided in the Offer.
      </BodyText>

      <SubTitle>6.2 Artist Commitment</SubTitle>
      <BodyText>
        By applying to an Offer and not withdrawing their application prior to
        acceptance, the Artist agrees to perform under the stated terms if
        selected.
      </BodyText>

      <SubTitle>6.3 Binding Nature</SubTitle>
      <BodyText>
        Once a Venue selects an Artist and the Artist has not withdrawn their
        application:
      </BodyText>
      <BulletList
        items={[
          "The booking is considered final and binding between the Venue and the Artist.",
          "Neither party may cancel, withdraw, or otherwise back out of the agreement.",
        ]}
      />

      {/* 7. USER RESPONSIBILITIES */}
      <SectionTitle>7. USER RESPONSIBILITIES</SectionTitle>
      <BodyText>Users agree to:</BodyText>
      <BulletList
        items={[
          "Act in good faith in all interactions",
          "Honor all accepted bookings",
          "Provide accurate and truthful information",
          "Comply with all applicable laws and regulations",
        ]}
      />

      {/* 8. LIMITATION OF LIABILITY */}
      <SectionTitle>8. LIMITATION OF LIABILITY</SectionTitle>
      <BodyText>
        The Company acts solely as a platform provider and is not a party to
        agreements between Artists and Venues. The Company is not responsible
        for:
      </BodyText>
      <BulletList
        items={[
          "Performance quality",
          "Payment disputes",
          "Cancellations or no-shows",
          "Any damages arising from interactions between Users",
        ]}
      />
      <BodyText>
        To the fullest extent permitted by law, the Company disclaims all
        liability arising from User interactions.
      </BodyText>

      {/* 9. TERMINATION */}
      <SectionTitle>9. TERMINATION</SectionTitle>
      <BodyText>
        The Company reserves the right to suspend or terminate any User account
        at its discretion, including for violations of these Terms.
      </BodyText>

      {/* 10. MODIFICATIONS TO TERMS */}
      <SectionTitle>10. MODIFICATIONS TO TERMS</SectionTitle>
      <BodyText>
        The Company may update these Terms at any time. Continued use of the App
        constitutes acceptance of any revised Terms.
      </BodyText>

      {/* 11. GOVERNING LAW */}
      <SectionTitle>11. GOVERNING LAW</SectionTitle>
      <BodyText>
        These Terms shall be governed by and construed in accordance with
        applicable laws, to be specified by the Company.
      </BodyText>

      {/* 12. CONTACT INFORMATION */}
      <SectionTitle>12. CONTACT INFORMATION</SectionTitle>
      <BodyText>
        For questions regarding these Terms, Users may contact:
      </BodyText>
      <BodyText>Jack Manfredi</BodyText>
      <BodyText>Email: gigdogscontact@gmail.com</BodyText>
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
