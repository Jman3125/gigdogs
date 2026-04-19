import { auth } from "@/config/firebaseConfig";
//Verify if the user has verified their email
export async function CheckVerification() {
  await auth.currentUser?.reload();

  if (auth.currentUser?.emailVerified) {
    return { valid: true };
  } else {
    return { valid: false };
  }
}
