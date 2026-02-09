//To get data on all bands to scroll through and view

import { db } from "@/config/firebaseConfig";
import { Band } from "@/models/band";
import { collection, getDocs } from "firebase/firestore";

export async function getAllBands() {
  try {
    const artistCollection = await getDocs(collection(db, "users"));
    const artistData = artistCollection.docs.map((doc) => doc.data() as Band);
    return artistData;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
