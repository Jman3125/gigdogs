//This is where bands can edit their information once signed in
import { LabelWrapper } from "@/components/label-wrapper";
import Loading from "@/components/loading";
import LogoTitle from "@/components/logo-title";
import SearchLocation from "@/components/search-location";
import { ThemeText } from "@/components/theme-text";
import { auth } from "@/config/firebaseConfig";
import { useImagePicker } from "@/hooks/use-image-picker";
import { useLogout } from "@/hooks/use-logout";
import { useUpdate } from "@/hooks/use-update";
import { Genres } from "@/models/band";
import { colors } from "@/utilities/colors";
import { fetchAuthBand } from "@/utilities/firebase/fetch-auth-band";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
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
  const [loading, setLoading] = useState(true);

  const { pickImage } = useImagePicker();

  const { update } = useUpdate();

  const { logout } = useLogout();

  //For band name
  const [bandName, setBandName] = useState("");

  //For email
  const [email, setEmail] = useState("");

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
  const [price, setPrice] = useState(0);

  //For hours
  const [hours, setHours] = useState(0);

  //For minutes
  const [minutes, setMinutes] = useState(0);

  //For instagram username
  const [instagram, setInstagram] = useState("");

  //For Image File Upload
  const [image, setImage] = useState("");

  //For signed in band
  const [signedInBand, setSignedInBand] = useState<any>(null);

  // Error state
  const [error, setError] = useState("");

  // fetch signed in bands data
  const fetchAuthBandData = async (uid: string) => {
    try {
      const band = await fetchAuthBand(uid);
      setSignedInBand(band);
      return band;
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
        const bandAuthData = await fetchAuthBandData(user.uid);
        setSignedInBand(bandAuthData);
        setBandName(bandAuthData?.bandName);
        setEmail(bandAuthData?.email);
        setCity(bandAuthData?.location);
        selectGenre(bandAuthData?.genre);
        setBio(bandAuthData?.bio);
        setPhone(bandAuthData?.phone);
        setPrice(bandAuthData?.pricePerHour);
        setHours(bandAuthData?.hours);
        setMinutes(bandAuthData?.minutes);
        setInstagram(bandAuthData?.instagram);
        setImage(bandAuthData?.picture);

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

  const navigator = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      navigator.dismissAll();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const submit = async () => {
    try {
      await update(
        bandName,
        email,
        city,
        selectedGenre,
        price,
        bio,
        image,
        hours,
        minutes,
        instagram,
        phone,
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
          headerLeft: () => (
            <Pressable
              style={styles.headerButton}
              onPress={() => navigator.back()}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
              <ThemeText type="defaultSemiBold" style={styles.headerText}>
                Sign In
              </ThemeText>
            </Pressable>
          ),
        }}
      />
      {loading && <Loading />}
      {!loading && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <ThemeText type="title">
              Welcome, {signedInBand?.bandName || ""}
            </ThemeText>

            <ThemeText type="subtitle">Edit Account</ThemeText>
            <View>
              <LabelWrapper label="Band Name">
                <TextInput
                  placeholder="Your Band Name Here"
                  maxLength={50}
                  style={styles.input}
                  placeholderTextColor={"#464141cb"}
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
                  placeholderTextColor={"#464141cb"}
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                  }}
                />
              </LabelWrapper>

              <LabelWrapper label="Your City">
                <SearchLocation city={city} setCity={setCity} />
              </LabelWrapper>

              <LabelWrapper label="Genre">
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

              <LabelWrapper label="Bio">
                <TextInput
                  placeholder="Tell us a little about yourself"
                  multiline
                  numberOfLines={5}
                  maxLength={500}
                  style={styles.multiline}
                  placeholderTextColor={"#464141cb"}
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
                  placeholderTextColor={"#464141cb"}
                  value={phone}
                  onChangeText={(value) => {
                    setPhone(value);
                  }}
                />
              </LabelWrapper>
              <LabelWrapper label="Price Per Hour">
                <View style={styles.priceContainer}>
                  <ThemeText>$</ThemeText>
                  <TextInput
                    placeholder="15"
                    inputMode="numeric"
                    style={styles.input}
                    placeholderTextColor={"#464141cb"}
                    value={price.toString()}
                    onChangeText={(value) => {
                      setPrice(parseFloat(value) || 0);
                    }}
                  />
                </View>
              </LabelWrapper>
              <LabelWrapper label="How long can you play for?">
                <LabelWrapper label="Hours">
                  <TextInput
                    placeholder="Hours"
                    inputMode="numeric"
                    style={styles.input}
                    placeholderTextColor={"#464141cb"}
                    value={hours.toString()}
                    onChangeText={(value) => {
                      setHours(parseInt(value) || 0);
                    }}
                    maxLength={1}
                  />
                </LabelWrapper>

                <LabelWrapper label="Minutes">
                  <TextInput
                    placeholder="Minutes"
                    inputMode="numeric"
                    style={styles.input}
                    placeholderTextColor={"#464141cb"}
                    value={minutes.toString()}
                    onChangeText={(value) => {
                      setMinutes(parseInt(value) || 0);
                    }}
                    maxLength={2}
                  />
                </LabelWrapper>
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
    marginBottom: 20,
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
  headerButton: {
    alignItems: "center",
    marginRight: 10,
    flexDirection: "row",
  },
  headerText: {
    color: "white",
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
  text: {
    color: "white",
  },
});
