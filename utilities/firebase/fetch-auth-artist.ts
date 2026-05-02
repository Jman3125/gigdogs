//To get data on the currently signed in artist
import { db } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

//used to fetch a signed in artists data

export async function fetchAuthArtist(uid: string) {
  try {
    //using uid to authorize
    const artistDocRef = doc(db, "users", uid);
    const artistSnapshot = await getDoc(artistDocRef);
    return artistSnapshot.data();
  } catch (error: any) {
    throw new Error("No Artist Found");
  }
}
