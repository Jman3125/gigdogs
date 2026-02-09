// Process user login
import { validateLoginFields } from "@/utilities/authenticate/authenticate-login";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function useLogin() {
  const login = async (email: string, password: string) => {
    const result = validateLoginFields(email, password);

    if (!result.valid) {
      throw new Error(result.message);
    }

    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return { success: true };
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  return { login };
}
