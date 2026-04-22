//Sign up Page
import FacebookInput from "@/components/facebook-input";
import IconInput from "@/components/icon-input";
import { LabelWrapper } from "@/components/label-wrapper";
import Loading from "@/components/loading";
import { TermsPrivacyLinks } from "@/components/terms-privacy";
import { ThemeText } from "@/components/theme-text";
import { ReloadFeedContext } from "@/context/reload-feed";
import { useImagePicker } from "@/hooks/use-image-picker";
import { useSignupVenue } from "@/hooks/use-signup";
import { States } from "@/models/venue";
import { colors } from "@/utilities/colors";
import { FontAwesome } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
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

export default function VenueSingup() {
  //Will use context after signup to update home feed so user sees changes
  const { setReload } = useContext(ReloadFeedContext);
  //Navigator
  const navigator = useRouter();

  //loading state
  const [loading, setLoading] = useState(false);

  //Sign up function
  const { signup } = useSignupVenue();

  const { pickImage } = useImagePicker();

  //For venue name
  const [venueName, setVenueName] = useState("");

  //For email
  const [email, setEmail] = useState("");

  //For password
  const [password, setPassword] = useState("");

  //For password confirmation
  const [password2, setPassword2] = useState("");

  //For Venue Adress
  const [address, setAddress] = useState("");

  //For State picker selection
  const [openState, setOpenState] = useState(false);
  const [selectedState, selectState] = useState("xyz");
  const [states, setStates] = useState(States);

  //For Phone
  const [phone, setPhone] = useState("");

  //LINKS
  //For venue website username
  const [website, setWebsite] = useState("");

  //For instagram username
  const [instagram, setInstagram] = useState("");

  //For facebook username
  const [facebook, setFacebook] = useState("");

  //For Image File Upload
  const [image, setImage] = useState<string | null>(null);

  //For checkbox
  const [isCheckedInfo, setCheckedInfo] = useState(false);

  const [isCheckedTerms, setCheckedTerms] = useState(false);

  // Honeypot field
  const [honey, setHoney] = useState("");

  //for Error
  const [error, setError] = useState("");

  //Submit signup form
  const submit = async () => {
    try {
      setLoading(true);
      await signup(
        venueName,
        email,
        password,
        password2,
        selectedState,
        address,
        image || "",
        website,
        instagram,
        facebook,
        phone,
        honey,
        isCheckedTerms,
        isCheckedInfo,
      );
      //Alert the user a verification link has been sent.
      Alert.alert(
        "Please verify your email",
        "An email verification link has been sent to you.",
        [
          {
            text: "Ok",
            onPress: async () => {
              setLoading(false);
              setReload(true);
              navigator.replace("/(main)");
            },
          },
        ],
      );
    } catch (error: any) {
      setLoading(false);
      Alert.alert("Error", error.message);
      setError(error.message);
    }
  };

  //For picking the profile image
  const onPickImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setImage(uri);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      {loading && <Loading />}
      {!loading && (
        <View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView>
              <ThemeText type="title" style={styles.title}>
                Venue Signup
              </ThemeText>

              <LabelWrapper label="Venue Name" footnote="Max Length: 40">
                <TextInput
                  placeholder="Venue Name"
                  maxLength={40}
                  style={styles.input}
                  placeholderTextColor={colors.placeholder}
                  value={venueName}
                  onChangeText={(value) => {
                    setVenueName(value);
                  }}
                />
              </LabelWrapper>

              <LabelWrapper label="Email">
                <TextInput
                  placeholder="123@music.com"
                  inputMode="email"
                  style={styles.input}
                  placeholderTextColor={colors.placeholder}
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                  }}
                />
              </LabelWrapper>

              <LabelWrapper
                label="Password"
                footnote="Must be at least 6 characters"
              >
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  value={password}
                  placeholder="Password"
                  placeholderTextColor={colors.placeholder}
                  onChangeText={(value) => {
                    setPassword(value);
                  }}
                  autoCapitalize="none"
                />
              </LabelWrapper>

              <LabelWrapper
                label="Confirm Password"
                footnote="Passwords must match"
              >
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  value={password2}
                  placeholder="Confirm password"
                  placeholderTextColor={colors.placeholder}
                  onChangeText={(value) => {
                    setPassword2(value);
                  }}
                  autoCapitalize="none"
                />
              </LabelWrapper>

              <LabelWrapper
                label="Address"
                footnote="So artists you hire can find you"
              >
                <TextInput
                  placeholder="123 Main St, City"
                  style={styles.input}
                  placeholderTextColor={colors.placeholder}
                  value={address}
                  onChangeText={(value) => {
                    setAddress(value);
                  }}
                />
              </LabelWrapper>

              <LabelWrapper label="State">
                <DropDownPicker
                  open={openState}
                  value={selectedState}
                  items={States}
                  setOpen={setOpenState}
                  setValue={selectState}
                  placeholder="Select a State"
                  listMode="MODAL"
                  style={styles.picker}
                />
              </LabelWrapper>

              <LabelWrapper label="Phone Number">
                <TextInput
                  placeholder="1234567890"
                  inputMode="tel"
                  style={styles.input}
                  placeholderTextColor={colors.placeholder}
                  value={phone}
                  onChangeText={(value) => {
                    setPhone(value);
                  }}
                  maxLength={11}
                />
              </LabelWrapper>

              <ThemeText type="defaultSemiBold">
                Socials (please provide at least 1)
              </ThemeText>
              <LabelWrapper label="Website">
                <TextInput
                  placeholder="VenueWebsite.com"
                  placeholderTextColor={colors.placeholder}
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
                  placeholderTextColor={colors.placeholder}
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
                  <ThemeText type="subtitle">Add Venue Picture</ThemeText>
                  <FontAwesome name="plus" size={42} color="black" />
                </View>

                {image && (
                  <Image source={{ uri: image }} style={styles.image} />
                )}
              </Pressable>

              <TextInput
                value={honey}
                onChangeText={setHoney}
                style={styles.honeypot}
                autoCapitalize="none"
                autoCorrect={false}
                importantForAutofill="no"
                accessibilityElementsHidden
                placeholder="Leave this field empty"
              />

              <View style={styles.horizontalWrap}>
                <ThemeText type="default" style={styles.termsText}>
                  I give GigDogs permission to openly display my information
                  provided.
                </ThemeText>
                <Checkbox
                  value={isCheckedInfo}
                  onValueChange={setCheckedInfo}
                  style={styles.checkbox}
                />
              </View>
              <View style={styles.horizontalWrap}>
                <ThemeText type="default" style={styles.termsText}>
                  I have read and agree to the <TermsPrivacyLinks />
                </ThemeText>
                <Checkbox
                  value={isCheckedTerms}
                  onValueChange={setCheckedTerms}
                  style={styles.checkbox}
                />
              </View>

              {error ? <ThemeText type="error">{error}</ThemeText> : null}

              <Pressable style={styles.signupButton} onPress={() => submit()}>
                <ThemeText type="defaultSemiBold">Submit</ThemeText>
              </Pressable>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    color: "white",
  },
  title: {
    marginBottom: 20,
    marginTop: 15,
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
  checkbox: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  termsText: {
    flexShrink: 1,
  },
  signupButton: {
    marginTop: 25,
    marginBottom: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: "100%",
    height: 50,
    borderRadius: 15,
  },

  honeypot: {
    height: 0,
    width: 0,
    opacity: 0,
    position: "absolute",
    left: -9999,
  },
});
