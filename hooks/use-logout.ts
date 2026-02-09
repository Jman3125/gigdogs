import { auth } from "@/config/firebaseConfig";

export function useLogout() {
  const logout = () => auth.signOut();
  return { logout };
}
