import { auth, db } from "@/config/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

//Will return true if there is a user and determine if the role is venue or artist
export function useAuthWithRole() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<"artist" | "venue" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);

      if (!authUser) {
        setRole(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      const refArtist = doc(db, "users", authUser.uid);
      const refVenue = doc(db, "venues", authUser.uid);
      const snapArtist = await getDoc(refArtist);
      const snapVenue = await getDoc(refVenue);

      if (snapArtist.exists()) {
        setRole("artist");
      } else if (snapVenue.exists()) {
        setRole("venue");
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return unsub;
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const refArtist = doc(db, "users", user.uid);
    const refVenue = doc(db, "venues", user.uid);

    const unsubscribeArtist = onSnapshot(refArtist, (snap) => {
      if (snap.exists()) {
        setRole("artist");
      }
    });

    const unsubscribeVenue = onSnapshot(refVenue, (snap) => {
      if (snap.exists()) {
        setRole("venue");
      }
    });

    return () => {
      unsubscribeArtist();
      unsubscribeVenue();
    };
  }, [user]);

  return {
    role,
    isSignedIn: !!user,
    loading,
  };
}
