//To get data on the currently signed in band
import { db } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export async function fetchAuthBand(uid: string) {
  try {
    const bandDocRef = doc(db, "users", uid);
    const bandSnapshot = await getDoc(bandDocRef);
    return bandSnapshot.data();
  } catch (error: any) {
    throw new Error("No band found");
  }
}
