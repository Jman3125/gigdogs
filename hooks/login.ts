// Process user login
import { isValidEmail } from "@/utilities/authenticate";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function login(email: string, password: string) {
  console.log("Logging in with email:", email);
  if (!isValidEmail(email)) {
    return new Error("Invalid Email Format.");
  }

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorMessage = error.message;
      return new Error(errorMessage);
    });

  return true;
}
