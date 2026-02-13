//Login Page
import { LabelWrapper } from "@/components/label-wrapper";
import Loading from "@/components/loading";
import LogoTitle from "@/components/logo-title";
import { ThemeText } from "@/components/theme-text";
import { ReloadFeedContext } from "@/context/reload-feed";
import { useLogin } from "@/hooks/use-login";
import { colors } from "@/utilities/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  //Will use context after login to update home feed so user sees changes
  const { reload, setReload } = useContext(ReloadFeedContext);
  //router
  const navigator = useRouter();

  //Loading state
  const [loading, setLoading] = useState(false);

  const { login } = useLogin();
  //For email input
  const [email, setEmail] = useState("");

  //For password input
  const [password, setPassword] = useState("");

  //For errors
  const [error, setError] = useState("");

  //submit login
  const submit = async () => {
    try {
      setLoading(true);
      await login(email, password);
      setLoading(false);

      //return to feed but delay so reload state updates
      navigator.dismissAll();

      //reload home page
      setReload(true);
    } catch (error: any) {
      setLoading(false);
      Alert.alert("Error", error.message);
      setError(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {loading && <Loading />}
      {!loading && (
        <View>
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

          <ThemeText type="title" style={styles.title}>
            Login
          </ThemeText>

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
          {error ? <ThemeText type="error">{error}</ThemeText> : null}
          <Pressable style={styles.loginButton} onPress={() => submit()}>
            <ThemeText type="defaultSemiBold">Login</ThemeText>
          </Pressable>
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
  loginButton: {
    marginTop: 25,
    marginBottom: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: "100%",
    height: 50,
    borderRadius: 15,
  },
  headerButton: {
    alignItems: "center",
    marginRight: 10,
    flexDirection: "row",
  },
  headerText: {
    color: "white",
  },
});
