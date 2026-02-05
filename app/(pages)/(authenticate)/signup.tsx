//Sign up Page
import LabelWrapper from "@/components/label-wrapper";
import { ThemeText } from "@/components/theme-text";
import { Genres, Hours, Minutes } from "@/models/band";
import signup from "@/scripts/sign-up";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  Image,
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

  //For band name
  const [bandName, setBandName] = useState("");

  //For email
  const [email, setEmail] = useState("");

  //For password
  const [password, setPassword] = useState("");

  //For Genre picker selection
  const [openGenre, setOpenGenre] = useState(false);
  const [selectedGenre, selectGenre] = useState("");
  const [genres, setGenres] = useState(Genres);

  //For bio
  const [bio, setBio] = useState("");

  //For Price per hour
  const [price, setPrice] = useState("");

  //For hours setlist picker selection
  const [openHours, setOpenHours] = useState(false);
  const [selectedHour, selectHour] = useState(0);
  const [hours, setHours] = useState(Hours);

  //For instagram username
  const [instagram, setInstagram] = useState("");

  //For minutes setlist picker selection
  const [openMinutes, setOpenMinutes] = useState(false);
  const [selectedMinute, selectMinute] = useState(0);
  const [minutes, setMinutes] = useState(Minutes);

  //For Image File Upload
  const [image, setImage] = useState<string | null>(null);

  function submit() {
    try {
      const result = signup(
        Math.random().toString(),
        bandName,
        email,
        password,
        selectedGenre,
        parseFloat(price),
        bio,
        image || "",
        selectedHour,
        selectedMinute,
        instagram,
      );

      if (result instanceof Error) {
        Alert.alert("Error", result.message);
        return;
      }

      navigator.back();
    } catch (error) {
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please contact support.",
      );
    }
  }

  const pickImage = async () => {
    // Request permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission required", "We need access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1], // square crop
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        <ThemeText type="title" style={styles.title}>
          Add Band
        </ThemeText>

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

        <LabelWrapper label="Password">
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={(value) => {
              setPassword(value);
            }}
            autoCapitalize="none"
          />
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
            zIndex={1000}
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

        <LabelWrapper label="Price Per Hour">
          <View style={styles.priceContainer}>
            <ThemeText>$</ThemeText>
            <TextInput
              placeholder="15"
              inputMode="numeric"
              style={styles.input}
              placeholderTextColor={"#464141cb"}
              value={price}
              onChangeText={(value) => {
                setPrice(value);
              }}
            />
          </View>
        </LabelWrapper>

        <LabelWrapper label="How long can you play for?">
          <DropDownPicker
            open={openHours}
            value={selectedHour}
            items={hours}
            setOpen={setOpenHours}
            setValue={selectHour}
            setItems={setHours}
            placeholder="Hours"
            zIndex={1000}
            style={styles.picker}
          />

          <DropDownPicker
            open={openMinutes}
            value={selectedMinute}
            items={minutes}
            setOpen={setOpenMinutes}
            setValue={selectMinute}
            setItems={setMinutes}
            placeholder="Minutes"
            zIndex={999}
            style={styles.picker}
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

        <LabelWrapper label="Profile Picture">
          <Pressable onPress={pickImage}>
            <ThemeText type="default">Click to choose image</ThemeText>
            {image && <Image source={{ uri: image }} style={styles.image} />}
          </Pressable>

          <ThemeText type="default">Tap to change profile picture</ThemeText>
        </LabelWrapper>

        <Button onPress={() => submit()} title="Sign Up" />
      </ScrollView>
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
    height: 40,
    padding: 5,
    borderWidth: 1,
    color: "black",
  },
  multiline: {
    height: 60,
    padding: 5,
    borderWidth: 1,
    color: "black",
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
});
