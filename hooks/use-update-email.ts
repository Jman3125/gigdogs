import { auth, db } from "@/config/firebaseConfig";
import { validateUserEmailUpdate } from "@/utilities/validate/authenticate-email-update";
import { validateLoginFields } from "@/utilities/validate/authenticate-login";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useLogout } from "./use-logout";
//Update user email
export function useUpdateEmail() {
  //Logout function that will be implemented on email change
  const { logout } = useLogout();
  //Pass the new email, if user needs to be reauthenticated then do that here and update email
  const updateEmail = async (
    newEmail: string,
    email?: string,
    password?: string,
  ) => {
    //Ensure no fields are empty
    const result = validateUserEmailUpdate(newEmail);

    if (!result.valid) {
      throw new Error(result.message);
    }

    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated.");
    }

    // Check if ANY other venue/artist has this email
    const q1 = query(collection(db, "users"), where("email", "==", newEmail));

    const q2 = query(collection(db, "venues"), where("email", "==", newEmail));

    const snapshot1 = await getDocs(q1);
    const snapshot2 = await getDocs(q2);

    const emailTakenByAnotherUser =
      (!snapshot1.empty && snapshot1.docs.some((doc) => doc.id !== user.uid)) ||
      (!snapshot2.empty && snapshot2.docs.some((doc) => doc.id !== user.uid));

    if (emailTakenByAnotherUser) {
      throw new Error("That email is already in use.");
    }

    //Ensure user is authenticated before updating if needed (error would have been thrown and this would be users second time after passing email and password)
    if (email && password) {
      try {
        //ensure they are not empty or invalid
        const reAuthResult = validateLoginFields(email!, password!);

        if (!reAuthResult.valid) {
          throw new Error(result.message);
        }

        const credential = EmailAuthProvider.credential(email!, password!);
        await reauthenticateWithCredential(user, credential);
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
    //User is now reauthenticated if this is the second time trying to update email and they got the requires-recent-login error
    try {
      //Send email update verification

      await verifyBeforeUpdateEmail(user, newEmail);
      await logout();
    } catch (error: any) {
      console.error("verifyBeforeUpdateEmail: error", {
        code: error.code,
        message: error.message,
        fullError: error,
      });
      const errorCode = error.code;

      if (errorCode === "auth/requires-recent-login") {
        throw new Error("You must reauthenticate to update your email.");
      }
      //Firebase was not catching
      throw new Error(error.message);
    }
  };

  return { updateEmail };
}
