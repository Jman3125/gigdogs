import { auth, db } from "@/config/firebaseConfig";
import { validateLoginFields } from "@/utilities/authenticate/authenticate-login";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export function useLogin() {
  const login = async (email: string, password: string) => {
    const result = validateLoginFields(email, password);

    if (!result.valid) {
      throw new Error(result.message);
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      //Sync Firestore email with Auth email
      if (user?.uid && user.email) {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const firestoreEmail = snap.data().email;
          const authEmail = user.email;

          // If Firestore email doesn't match the email used to log in, update it
          if (authEmail !== firestoreEmail) {
            await updateDoc(userRef, { email: authEmail });
          }
        }
      }

      return { success: true, user };
    } catch (error: any) {
      throw new Error(error.message || "Login failed.");
    }
  };

  return { login };
}
