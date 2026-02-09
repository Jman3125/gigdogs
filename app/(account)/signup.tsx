//Sign up Page
import { LabelWrapper } from "@/components/label-wrapper";
import LogoTitle from "@/components/logo-title";
import SearchLocation from "@/components/search-location";
import { TermsPrivacyLinks } from "@/components/terms-privacy";
import { ThemeText } from "@/components/theme-text";
import { useImagePicker } from "@/hooks/use-image-picker";
import { useSignup } from "@/hooks/use-signup";
import { Genres } from "@/models/band";
import { colors } from "@/utilities/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Checkbox } from "expo-checkbox";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
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

export default function Singup() {
  const navigator = useRouter();

  const { signup } = useSignup();

  const { pickImage } = useImagePicker();

  //For band name
  const [bandName, setBandName] = useState("");

  //For email
  const [email, setEmail] = useState("");

  //For password
  const [password, setPassword] = useState("");

  //For Location
  const [city, setCity] = useState("");

  //For Genre picker selection
  const [openGenre, setOpenGenre] = useState(false);
  const [selectedGenre, selectGenre] = useState("");
  const [genres, setGenres] = useState(Genres);

  //For bio
  const [bio, setBio] = useState("");

  //For Phone
  const [phone, setPhone] = useState("");

  //For Price per hour
  const [price, setPrice] = useState("");

  //For hours
  const [hours, setHours] = useState("");

  //For minutes
  const [minutes, setMinutes] = useState("");

  //For instagram username
  const [instagram, setInstagram] = useState("");

  //For Image File Upload
  const [image, setImage] = useState<string | null>(null);

  //For checkbox
  const [isCheckedInfo, setCheckedInfo] = useState(false);

  const [isCheckedTerms, setCheckedTerms] = useState(false);

  // Honeypot field
  const [honey, setHoney] = useState("");

  //for Error
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      await signup(
        bandName,
        email,
        password,
        city,
        selectedGenre,
        parseFloat(price),
        bio,
        image || "",
        parseInt(hours),
        parseInt(minutes),
        instagram,
        phone,
        honey,
        isCheckedTerms,
        isCheckedInfo,
      );

      navigator.dismissAll();
    } catch (error: any) {
      Alert.alert("Error", error.message);
      setError(error.message);
    }
  };
  const onPickImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setImage(uri);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Stack.Screen
        options={{
          headerTitle: () => <LogoTitle />,
          headerRight: () => (
            <Pressable
              style={styles.headerButtonRight}
              onPress={() => navigator.navigate("./login")}
            >
              <ThemeText type="defaultSemiBold" style={styles.headerText}>
                Login
              </ThemeText>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable
              style={styles.headerButtonLeft}
              onPress={() => navigator.back()}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
              <ThemeText type="defaultSemiBold" style={styles.headerText}>
                Feed
              </ThemeText>
            </Pressable>
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <ThemeText type="title" style={styles.title}>
            Add Band
          </ThemeText>

          <LabelWrapper label="Band Name" footnote="Max Length: 50">
            <TextInput
              placeholder="Your Band Name Here"
              maxLength={35}
              style={styles.input}
              placeholderTextColor={colors.placeholder}
              value={bandName}
              onChangeText={(value) => {
                setBandName(value);
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
          <LabelWrapper label="Your City">
            <SearchLocation city={city} setCity={setCity} />
          </LabelWrapper>

          <LabelWrapper label="What type of music do you play">
            <DropDownPicker
              open={openGenre}
              value={selectedGenre}
              items={genres}
              setOpen={setOpenGenre}
              setValue={selectGenre}
              setItems={setGenres}
              placeholder="Select a genre"
              listMode="MODAL"
              style={styles.picker}
            />
          </LabelWrapper>

          <LabelWrapper label="Bio" footnote="Max Length: 150">
            <TextInput
              placeholder="Why should someone hire you? What should they know about your act?"
              multiline
              numberOfLines={5}
              maxLength={150}
              style={styles.multiline}
              placeholderTextColor={colors.placeholder}
              value={bio}
              onChangeText={(value) => {
                setBio(value);
              }}
            />
          </LabelWrapper>

          <LabelWrapper label="Phone Number">
            <TextInput
              placeholder="1234567890"
              inputMode="numeric"
              style={styles.input}
              placeholderTextColor={colors.placeholder}
              value={phone}
              onChangeText={(value) => {
                setPhone(value);
              }}
              maxLength={10}
            />
          </LabelWrapper>

          <LabelWrapper
            label="Price Per Hour"
            footnote="How much you charge for every hour you play."
          >
            <View style={styles.priceContainer}>
              <ThemeText>$</ThemeText>
              <TextInput
                placeholder="15"
                inputMode="numeric"
                style={styles.input}
                placeholderTextColor={colors.placeholder}
                value={price}
                onChangeText={(value) => {
                  setPrice(value);
                }}
              />
            </View>
          </LabelWrapper>

          <ThemeText type="defaultSemiBold">
            How long can you play for?
          </ThemeText>
          <LabelWrapper label="Hours">
            <TextInput
              placeholder="Hours"
              inputMode="numeric"
              style={styles.input}
              placeholderTextColor={colors.placeholder}
              value={hours}
              onChangeText={(value) => {
                setHours(value);
              }}
              maxLength={1}
            />
          </LabelWrapper>

          <LabelWrapper label="Minutes">
            <TextInput
              placeholder="Minutes"
              inputMode="numeric"
              style={styles.input}
              placeholderTextColor={colors.placeholder}
              value={minutes}
              onChangeText={(value) => {
                setMinutes(value);
              }}
              maxLength={2}
            />
          </LabelWrapper>

          <LabelWrapper
            label="Instagram"
            footnote="So people can check you out!"
          >
            <TextInput
              placeholder="username"
              placeholderTextColor={colors.placeholder}
              style={styles.input}
              value={instagram}
              onChangeText={(value) => {
                setInstagram(value);
              }}
            />
          </LabelWrapper>

          <Pressable onPress={onPickImage}>
            <View style={styles.horizontalWrap}>
              <ThemeText type="subtitle">Add Profile Picture</ThemeText>
              <Ionicons name="add" size={42} color="black" />
            </View>

            {image && <Image source={{ uri: image }} style={styles.image} />}
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
              I give Gig Dogs permission to openly display my information
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
            <ThemeText type="defaultSemiBold">Add Band</ThemeText>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerButtonLeft: {
    alignItems: "center",
    marginRight: 10,
    flexDirection: "row",
  },
  headerButtonRight: {
    alignItems: "center",
    marginLeft: 10,

    flexDirection: "row",
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
