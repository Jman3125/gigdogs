//To get data on the currently signed in venue
import { db } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

//used to fetch a signed in venues data

export async function fetchAuthVenue(uid: string) {
  try {
    //using uid to authorize
    const venueDocRef = doc(db, "venues", uid);
    const venueSnapshot = await getDoc(venueDocRef);
    return venueSnapshot.data();
  } catch (error: any) {
    throw new Error("No Venue found");
  }
}
