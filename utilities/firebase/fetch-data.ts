import { db } from "@/config/firebaseConfig";
import { Band } from "@/models/band";
import { collection, getDocs, query, where } from "firebase/firestore";

//To get data on all bands to scroll through and view. Will use on index page
export async function getAllBands() {
  try {
    const artistCollection = await getDocs(collection(db, "users"));
    const artistData = artistCollection.docs.map((doc) => doc.data() as Band);
    return artistData;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

//Just get data from one band. Will use on band-display off of feed page
export async function getOneBand(id: string) {
  try {
    const q = query(collection(db, "users"), where("id", "==", id));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Band not found");
    }

    const bandDoc = querySnapshot.docs[0];
    const data = bandDoc.data();

    return {
      id: bandDoc.id,
      ...data,
    } as Band;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
