//Sign up Page
import { LabelWrapper } from "@/components/label-wrapper";
import { SearchLocation } from "@/components/search-location";
import { ThemeText } from "@/components/theme-text";
import signup from "@/hooks/signup";
import { Genres } from "@/models/band";
import * as ImagePicker from "expo-image-picker";
import { Link, useRouter } from "expo-router";
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

  //For Location
  const [location, setLocation] = useState("");

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

  const submit = () => {
    try {
      const result = signup(
        bandName,
        email,
        password,
        location,
        selectedGenre,
        parseFloat(price),
        bio,
        image || "",
        parseInt(hours),
        parseInt(minutes),
        instagram,
        phone,
      );

      if (result instanceof Error) {
        Alert.alert("Error", result.message);
        return;
      }

      navigator.replace("/");
    } catch (error) {
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please contact support.",
      );
    }
  };

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
      <ScrollView>
        <Button title="return" onPress={() => navigator.back()} />
        <ThemeText type="title" style={styles.title}>
          Add Band
        </ThemeText>

        <LabelWrapper label="Already registered?">
          <Link href="/login">Login</Link>
        </LabelWrapper>

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

        <SearchLocation location={location} setLocation={setLocation} />

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
              value={price}
              onChangeText={(value) => {
                setPrice(value);
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
              placeholderTextColor={"#464141cb"}
              value={minutes}
              onChangeText={(value) => {
                setMinutes(value);
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
