import { auth } from "@/config/firebaseConfig";
import { validateUserEmailUpdate } from "@/utilities/authenticate/authenticate-email-update";
import { validateLoginFields } from "@/utilities/authenticate/authenticate-login";
import { getAllBands } from "@/utilities/firebase/fetch-data";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
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

    // Check if ANY other band has this email
    const allBands = await getAllBands();

    const emailTakenByAnotherBand = allBands.some(
      (band) => band.email === newEmail && band.id !== user.uid,
    );

    if (emailTakenByAnotherBand) {
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
