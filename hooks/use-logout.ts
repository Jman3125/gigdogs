import { auth } from "@/config/firebaseConfig";

//Process user logout
export function useLogout() {
  const logout = () => auth.signOut();
  return { logout };
}
