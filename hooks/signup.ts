import { auth, db } from "@/config/firebaseConfig";
import { isValidEmail } from "@/utilities/authenticate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default async function signup(
  bandName: string,
  email: string,
  password: string,
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
    // Validation
    if (!bandName.trim()) {
      throw new Error("Band name cannot be empty.");
    }

    if (!isValidEmail(email)) {
      throw new Error("Invalid email format.");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    // 1 Create auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const uid = userCredential.user.uid;

    const generateID = () => {
      return Math.random().toString(36).substring(2, 9);
    };

    const id = generateID();

    // 2 Upload image
    // const imageURL = picture ? await uploadImageAsync(picture, uid) : null;

    // 3 Create Firestore user doc
    await setDoc(doc(db, "users", uid), {
      id,
      bandName,
      email,
      location,
      genre,
      pricePerHour,
      bio,
      // picture: imageURL,
      hours,
      minutes,
      instagram,
      phone,
      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error: any) {
    console.log("Firebase error:", error);
    console.log("Error code:", error.code);
    console.log("Error message:", error.message);
    return { success: false, message: error.message };
  }
}
