//Page for user to change their password and email, navigate here through the account settings page
import { LabelWrapper } from "@/components/label-wrapper";
import Loading from "@/components/loading";
import LogoTitle from "@/components/logo-title";
import { ThemeText } from "@/components/theme-text";
import { auth } from "@/config/firebaseConfig";
import { useUpdateEmail } from "@/hooks/use-update-email";
import { colors } from "@/utilities/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CredentialsReset() {
  //router
  const navigator = useRouter();

  //Loading state
  const [loading, setLoading] = useState(false);

  //For email input
  const [newEmail, setNewEmail] = useState("");

  //For errors
  const [error, setError] = useState("");

  //update email
  const { updateEmail } = useUpdateEmail();

  //user needs to reauthenticate to change email
  const [reAuth, setReAuth] = useState(false);

  //Email and password for reauthentication
  //For email input
  const [email, setEmail] = useState("");

  //For password input
  const [password, setPassword] = useState("");

  //submit update
  const submitEmail = async () => {
    const user = auth.currentUser;

    //don't run update if user didn't enter new email or submits blank field
    if (newEmail !== user?.email) {
      setLoading(true);
      try {
        //Send email update with email and password to reauthenticate before updating if needed
        await updateEmail(newEmail || "", email, password);

        Alert.alert(
          "Please verify your email",
          "An email verification link has been sent to you. Please open it and verify your email.",
        );
        setLoading(false);
        navigator.dismissAll();
      } catch (error: any) {
        setEmail(`${user?.email}`);
        setLoading(false);
        Alert.alert("Error", error.message);
        setError(error.message);
        if (error.message === "You must reauthenticate to update your email.") {
          setReAuth(true);
        }
      }
    }
  };

  //Get users current email on page load
  useEffect(() => {
    const user = auth.currentUser;
    setNewEmail(`${user?.email}`);
  }, []);

  //send password reset link
  const changePassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email!);
      Alert.alert(
        "Email Sent",
        `A password reset has been sent to the email: ${email}, verifying will log you out of your account.`,
      );
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {loading && <Loading />}
      {!loading && (
        <ScrollView>
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
                    Account
                  </ThemeText>
                </Pressable>
              ),
            }}
          />

          <ThemeText type="title" style={styles.title}>
            Credentials
          </ThemeText>

          {/* User needs to reauthenticate, prompt email and password to pass with new email */}
          {reAuth && (
            <View style={styles.reAuthenticateContainer}>
              <ThemeText type="defaultSemiBold">
                Please login to continue
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

              <ThemeText type="default">
                Enter your new email below and try again once these fields are
                filled in.
              </ThemeText>
            </View>
          )}

          <LabelWrapper
            label="Update Email"
            footnote="Not seeing your email? Make sure you verified it."
          >
            <TextInput
              style={styles.input}
              placeholder="123@music.com"
              placeholderTextColor={"#464141cb"}
              inputMode="email"
              value={newEmail?.toString()}
              onChangeText={(value) => {
                setNewEmail(value);
              }}
            />
          </LabelWrapper>
          <LabelWrapper
            label=""
            footnote="Notice: After verifying your new email, you will be logged out."
          >
            <Pressable style={styles.button} onPress={() => submitEmail()}>
              <ThemeText type="defaultSemiBold">Update Email</ThemeText>
            </Pressable>
          </LabelWrapper>

          {error ? <ThemeText type="error">{error}</ThemeText> : null}
          <LabelWrapper label="Change Password">
            <Pressable style={styles.button} onPress={() => changePassword()}>
              <ThemeText type="defaultSemiBold">
                Send Password Reset Link
              </ThemeText>
            </Pressable>
          </LabelWrapper>
        </ScrollView>
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
  button: {
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
  //Show reauthentication fields
  reAuthenticateContainer: {
    padding: 5,
    backgroundColor: "rgb(236, 236, 236)",
    borderRadius: 10,
  },
});
