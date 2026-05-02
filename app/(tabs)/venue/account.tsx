//This is where venues can access and edit their information once signed in
import FacebookInput from "@/components/facebook-input";
import IconInput from "@/components/icon-input";
import { LabelWrapper } from "@/components/label-wrapper";
import Loading from "@/components/loading";
import { ThemeText } from "@/components/theme-text";
import { auth } from "@/config/firebaseConfig";
import { useImagePicker } from "@/hooks/use-image-picker";
import { useLogout } from "@/hooks/use-logout";
import { useUpdateVenue } from "@/hooks/use-update";
import { StatesDropDown } from "@/models/venue";
import { colors } from "@/utilities/colors";
import { fetchAuthVenue } from "@/utilities/firebase/fetch-auth-venue";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState(StatesDropDown);

  //For Website
  const [website, setWebsite] = useState("");

  //For instagram username
  const [instagram, setInstagram] = useState("");

  //For facebook username
  const [facebook, setFacebook] = useState("");

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
        setSelectedState(venueAuthData?.state);
        setWebsite(venueAuthData?.website);
        setInstagram(venueAuthData?.instagram);
        setFacebook(venueAuthData?.facebook);
        setImage(venueAuthData?.picture);

        setLoading(false);
      } else {
        setLoading(false);
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
      navigator.dismissAll();
      //return to feed
      navigator.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  //submit updates and return to feed.
  const submit = async () => {
    setLoading(true);
    try {
      await update(
        (venueName || "").trim(),
        (address || "").trim(),
        selectedState,
        image,
        (website || "").trim(),
        (instagram || "").trim(),
        (facebook || "").trim(),
      );
      Alert.alert("Success", "Information has been updated");
      navigator.dismissAll();
      setLoading(false);
      navigator.replace("/");
    } catch (error: any) {
      setLoading(false);
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
            <ThemeText type="subtitle">Edit Account</ThemeText>
            <View>
              <LabelWrapper label="Venue Name">
                <TextInput
                  placeholder="Venue Name"
                  maxLength={50}
                  style={styles.input}
                  placeholderTextColor={"#464141cb"}
                  value={venueName}
                  onChangeText={(value) => {
                    setVenueName(value);
                  }}
                />
              </LabelWrapper>
              <LabelWrapper label="Authentication">
                <Link href="/venue/credentials-reset-venue" asChild>
                  <Pressable style={styles.emailPasswordLink}>
                    <ThemeText type="defaultSemiBold">
                      Email & Password
                    </ThemeText>
                    <FontAwesome name="chevron-right" size={15} color="black" />
                  </Pressable>
                </Link>
              </LabelWrapper>

              <LabelWrapper label="State">
                <DropDownPicker
                  open={openState}
                  value={selectedState}
                  items={states}
                  setOpen={setOpenState}
                  setValue={setSelectedState}
                  setItems={setStates}
                  placeholder="Select a state"
                  listMode="MODAL"
                  style={styles.picker}
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
                <IconInput
                  icon="at"
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
                <FacebookInput
                  placeholder="username"
                  placeholderTextColor={"#464141cb"}
                  style={styles.input}
                  value={facebook}
                  onValueChange={(value) => {
                    setFacebook(value);
                  }}
                />
              </LabelWrapper>

              <Pressable onPress={onPickImage}>
                <View style={styles.horizontalWrap}>
                  <ThemeText type="subtitle">Change Profile Picture</ThemeText>
                  <FontAwesome name="plus" size={32} color="black" />
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
    gap: 5,
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
