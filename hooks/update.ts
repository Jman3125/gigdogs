import { auth, db } from "@/config/firebaseConfig";
import { isValidEmail } from "@/utilities/authenticate";
import { updateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export default async function update(
  bandName: string,
  email: string,
  location: string,
  genre: string,
  pricePerHour: number,
  bio: string,
  picture: string,
  hours: number,
  minutes: number,
  instagram: string,
  phone: string,
) {
  try {
    //NEED TO MAKE THIS A UTILITY CHECKS FUNCTION
    // Validation
    if (!bandName.trim()) {
      throw new Error("Band name cannot be empty.");
    }

    if (!isValidEmail(email)) {
      throw new Error("Invalid email format.");
    }

    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated.");
    }

    if (email !== user.email) {
      await updateEmail(user, email);
    }

    await updateDoc(doc(db, "users", user.uid), {
      bandName,
      location,
      genre,
      pricePerHour,
      bio,
      picture,
      hours,
      minutes,
      instagram,
      phone,
    });

    return { success: true };
  } catch (error: any) {
    console.log("Firebase error:", error);
    console.log("Error code:", error.code);
    console.log("Error message:", error.message);
    return { success: false, message: error.message };
  }
}
