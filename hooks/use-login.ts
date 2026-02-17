import { auth } from "@/config/firebaseConfig";
import { validateLoginFields } from "@/utilities/authenticate/authenticate-login";
import { signInWithEmailAndPassword } from "firebase/auth";

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
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      throw new Error(error.message || "Login failed.");
    }
  };

  return { login };
}
