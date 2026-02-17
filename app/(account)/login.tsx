//Login Page
import { LabelWrapper } from "@/components/label-wrapper";
import Loading from "@/components/loading";
import LogoTitle from "@/components/logo-title";
import { ThemeText } from "@/components/theme-text";
import { auth } from "@/config/firebaseConfig";
import { ReloadFeedContext } from "@/context/reload-feed";
import { useLogin } from "@/hooks/use-login";
import { colors } from "@/utilities/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { useContext, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  //Will use context after login to update home feed so user sees changes
  const { setReload } = useContext(ReloadFeedContext);
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

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  //forgot password reset function
  const handlePasswordReset = async () => {
    try {
      if (!resetEmail) {
        return Alert.alert("Enter Email", "Please enter your email.");
      }

      await sendPasswordResetEmail(auth, resetEmail);

      Alert.alert(
        "Email Sent",
        "If an account exists with this email, a reset link has been sent.",
      );

      setShowForgotModal(false);
      setResetEmail("");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

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

          <ThemeText onPress={() => setShowForgotModal(true)} type="link">
            Forgot Password?
          </ThemeText>
        </View>
      )}
      <Modal
        visible={showForgotModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowForgotModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ThemeText type="title" style={{ marginBottom: 15 }}>
              Reset Password
            </ThemeText>

            <LabelWrapper label="Email">
              <TextInput
                style={styles.input}
                placeholder="123@music.com"
                placeholderTextColor={"#464141cb"}
                inputMode="email"
                value={resetEmail}
                onChangeText={setResetEmail}
              />
            </LabelWrapper>

            <Pressable style={styles.loginButton} onPress={handlePasswordReset}>
              <ThemeText type="defaultSemiBold">Send Reset Email</ThemeText>
            </Pressable>

            <ThemeText
              type="link"
              onPress={() => setShowForgotModal(false)}
              style={{ marginTop: 10 }}
            >
              Cancel
            </ThemeText>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "90%",
    backgroundColor: "#eeeeee",
    padding: 20,
    borderRadius: 20,
  },
});
