//This is where venues can access and edit their information once signed in
import BandProfileLink from "@/components/band-profile-link";
import { LabelWrapper } from "@/components/label-wrapper";
import Loading from "@/components/loading";
import { ThemeText } from "@/components/theme-text";
import { auth } from "@/config/firebaseConfig";
import { ReloadFeedContext } from "@/context/reload-feed";
import { useImagePicker } from "@/hooks/use-image-picker";
import { useLogout } from "@/hooks/use-logout";
import { useUpdateVenue } from "@/hooks/use-update";
import { States } from "@/models/artist";
import { colors } from "@/utilities/colors";
import { fetchAuthVenue } from "@/utilities/firebase/fetch-auth-venue";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  //Will use context after update to update home feed so user sees changes
  const { setReload } = useContext(ReloadFeedContext);

  //loading state
  const [loading, setLoading] = useState(true);

  //For picked image
  const { pickImage } = useImagePicker();

  // update firebase hook
  const { update } = useUpdateVenue();

  //log out firebase hook
  const { logout } = useLogout();

  //FIELDS
  //For venue name
  const [venueName, setVenueName] = useState("");

  //For address
  const [address, setAddress] = useState("");

  //For state picker selection
  const [openState, setOpenState] = useState(false);
  const [selectedState, selectState] = useState("");
  const [states, setStates] = useState(States);

  //For Website
  const [website, setWebsite] = useState("");

  //For instagram username
  const [instagram, setInstagram] = useState("");

  //For facebook username
  const [facebook, setFacebook] = useState("");

  //For Phone
  const [phone, setPhone] = useState("");

  //For Image File Upload
  const [image, setImage] = useState("");

  //For signed in venue
  const [signedInVenue, setSignedInVenue] = useState<any>(null);

  // Error state
  const [error, setError] = useState("");

  // fetch signed in venues data
  const fetchAuthVenueData = async (uid: string) => {
    try {
      const venue = await fetchAuthVenue(uid);
      return venue;
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      Alert.alert(
        "Error",
        "Failed to fetch artist data. Please try again later.",
      );
    }
  };

  //On page load fetch data and set up auth listener to update signed-in state. Cleanup listener on unmount.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const venueAuthData = await fetchAuthVenueData(user.uid);
        //Set all fields to populate input fields
        setSignedInVenue(venueAuthData);
        setVenueName(venueAuthData?.venueName);
        setAddress(venueAuthData?.address);
        selectState(venueAuthData?.website);
        setPhone(venueAuthData?.phone);
        setWebsite(venueAuthData?.website);
        setInstagram(venueAuthData?.instagram);
        setImage(venueAuthData?.picture);

        setLoading(false);
      } else {
        Alert.alert(
          "Error",
          "Unable to fetch account data at this time, please try again.",
        );
      }
    });

    return unsubscribe;
  }, []);

  // navigator
  const navigator = useRouter();

  // handle logout function
  const handleLogout = async () => {
    try {
      await logout();
      //return to feed
      navigator.dismissAll();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  //submit updates and return to feed.
  const submit = async () => {
    setLoading(true);
    try {
      await update(
        venueName.trim(),
        address.trim(),
        selectedState,
        image,
        website.trim(),
        instagram.trim(),
        facebook.trim(),
        phone.trim(),
      );
      setLoading(false);
      setReload(true);
      navigator.dismissAll();
    } catch (error: any) {
      Alert.alert("Error", error.message);
      setError(error.message);
    }
  };

  // user selected an image.
  const onPickImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setImage(uri);
    }
  };
  return (
    <SafeAreaView style={styles.container} edges={[]}>
      {/* show loading state */}
      {loading && <Loading />}
      {!loading && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <ThemeText type="subtitle" style={styles.title}>
              Welcome, {signedInVenue?.venueName || ""}
            </ThemeText>
            <LabelWrapper
              label="GigDogs Profile Link"
              isBold={true}
              footnote="Tap to copy"
            >
              <BandProfileLink userId={signedInVenue.id} />
            </LabelWrapper>
            <ThemeText type="subtitle">Edit Account</ThemeText>
            <View>
              <LabelWrapper label="Band Name">
                <TextInput
                  placeholder="Your Band Name Here"
                  maxLength={50}
                  style={styles.input}
                  placeholderTextColor={"#464141cb"}
                  value={venueName}
                  onChangeText={(value) => {
                    setVenueName(value);
                  }}
                />
              </LabelWrapper>
              <LabelWrapper label="Update Email & Password">
                <Link href="/venue/credentials-reset" asChild>
                  <Pressable style={styles.emailPasswordLink}>
                    <ThemeText type="defaultSemiBold">
                      Email & Password
                    </ThemeText>
                    <Ionicons name="chevron-forward" size={25} color="black" />
                  </Pressable>
                </Link>
              </LabelWrapper>

              <LabelWrapper label="State">
                <DropDownPicker
                  open={openState}
                  value={selectedState}
                  items={states}
                  setOpen={setOpenState}
                  setValue={selectState}
                  setItems={setStates}
                  placeholder="Select a genre"
                  listMode="MODAL"
                  style={styles.picker}
                />
              </LabelWrapper>

              <LabelWrapper label="Phone Number">
                <TextInput
                  placeholder="1234567890"
                  inputMode="numeric"
                  style={styles.input}
                  placeholderTextColor={"#464141cb"}
                  value={phone}
                  onChangeText={(value) => {
                    setPhone(value);
                  }}
                />
              </LabelWrapper>

              <LabelWrapper label="Website">
                <TextInput
                  placeholder="username"
                  placeholderTextColor={"#464141cb"}
                  style={styles.input}
                  value={website}
                  onChangeText={(value) => {
                    setWebsite(value);
                  }}
                />
              </LabelWrapper>

              <LabelWrapper label="Instagram">
                <TextInput
                  placeholder="username"
                  placeholderTextColor={"#464141cb"}
                  style={styles.input}
                  value={instagram}
                  onChangeText={(value) => {
                    setInstagram(value);
                  }}
                />
              </LabelWrapper>

              <LabelWrapper label="Facebook">
                <TextInput
                  placeholder="username"
                  placeholderTextColor={"#464141cb"}
                  style={styles.input}
                  value={facebook}
                  onChangeText={(value) => {
                    setFacebook(value);
                  }}
                />
              </LabelWrapper>

              <Pressable onPress={onPickImage}>
                <View style={styles.horizontalWrap}>
                  <ThemeText type="subtitle">Add Profile Picture</ThemeText>
                  <Ionicons name="add" size={42} color="black" />
                </View>

                {image && (
                  <Image source={{ uri: image }} style={styles.image} />
                )}
              </Pressable>
              <Pressable style={styles.updateButton} onPress={() => submit()}>
                <ThemeText type="defaultSemiBold">Update Account</ThemeText>
              </Pressable>
            </View>

            {error ? <ThemeText type="error">{error}</ThemeText> : null}
            <Pressable
              style={styles.logoutButton}
              onPress={() => handleLogout()}
            >
              <ThemeText type="defaultSemiBold" style={styles.text}>
                Logout
              </ThemeText>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    marginBottom: 10,
  },
  input: {
    height: 50,
    width: "100%",
    padding: 8,
    color: "black",
    backgroundColor: "white",
    borderRadius: 10,
  },
  multiline: {
    height: 100,
    padding: 10,
    color: "black",
    backgroundColor: "white",
    borderRadius: 10,
  },
  picker: {
    width: 200,
    marginBottom: 15,
  },
  image: {
    height: 200,
    width: 200,
  },
  priceContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  horizontalWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    maxWidth: "100%",
  },
  updateButton: {
    marginTop: 25,
    marginBottom: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: "100%",
    height: 50,
    borderRadius: 15,
  },
  logoutButton: {
    marginBottom: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    width: 200,
    height: 50,
    borderRadius: 10,
  },
  // logout button text
  text: {
    color: "white",
  },
  emailPasswordLink: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 10,
  },
});
