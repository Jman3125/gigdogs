//Login Page
import { LabelWrapper } from "@/components/label-wrapper";
import { ThemeText } from "@/components/theme-text";
import login from "@/hooks/login";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const navigator = useRouter();
  //For email input
  const [email, setEmail] = useState("");

  //For password input
  const [password, setPassword] = useState("");

  const submit = () => {
    try {
      const result = login(email, password);

      if (result instanceof Error) {
        Alert.alert("Error", result.message);
        return;
      }

      navigator.dismissAll();
    } catch (error) {
      Alert.alert("Error", "An unexpected error has occurred.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemeText type="title" style={styles.title}>
        Login
      </ThemeText>

      <LabelWrapper label="Need to create an account?">
        <Button title="Create Account" onPress={() => navigator.back()} />
      </LabelWrapper>

      <LabelWrapper label="Email">
        <TextInput
          style={styles.input}
          placeholder="123@music.com"
          placeholderTextColor={"#464141cb"}
          inputMode="email"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
          }}
        />
      </LabelWrapper>

      <LabelWrapper label="Password">
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor={"#464141cb"}
          secureTextEntry={true}
          value={password}
          onChangeText={(value) => {
            setPassword(value);
          }}
        />
      </LabelWrapper>

      <Button title="Login" onPress={() => submit()} />
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
});
