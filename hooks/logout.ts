import { useRouter } from "@/.expo/types/router";
import { auth } from "@/config/firebaseConfig";

export async function logout() {
  const navigator = useRouter();

  try {
    await auth.signOut();
    navigator.back();
  } catch (error) {
    console.log("Logout failed:", error);
  }
}
