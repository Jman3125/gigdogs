//To get data on the currently signed in band
import { db } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

//used to fetch a signed in bands data

export async function fetchAuthBand(uid: string) {
  try {
    //using uid to authorize
    const bandDocRef = doc(db, "users", uid);
    const bandSnapshot = await getDoc(bandDocRef);
    return bandSnapshot.data();
  } catch (error: any) {
    throw new Error("No band found");
  }
}
