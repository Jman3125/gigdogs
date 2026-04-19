import { auth, db } from "@/config/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

//Will return true if there is a user and determine if the role is venue or artist
export function useAuthWithRole() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<"artist" | "venue" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);

      if (authUser) {
        const refArtist = doc(db, "users", authUser.uid);
        const refVenue = doc(db, "venues", authUser.uid);
        const snapArtist = await getDoc(refArtist);
        const snapVenue = await getDoc(refVenue);

        if (snapArtist.exists()) {
          setRole("artist");
        }
        if (snapVenue.exists()) {
          setRole("venue");
        }
      }

      setLoading(false);
    });

    return unsub;
  }, []);

  return {
    role,
    isSignedIn: !!user,
    loading,
  };
}
