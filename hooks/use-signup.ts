import { auth, db } from "@/config/firebaseConfig";
import { validateSignupFields } from "@/utilities/authenticate/authenticate-signup";
import { uploadImageAsync } from "@/utilities/upload-image";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

//Process user signup

export function useSignup() {
  const signup = async (
    bandName: string,
    email: string,
    password: string,
    password2: string,
    location: string,
    genre: string,
    pricePerHour: number,
    bio: string,
    picture: string,
    hours: number,
    minutes: number,
    instagram: string,
    phone: string,
    honey: string,
    readTerms: boolean,
    readInfo: boolean,
  ) => {
    // Validate fields
    const result = validateSignupFields(
      bandName,
      email,
      password,
      password2,
      location,
      genre,
      pricePerHour,
      bio,
      picture,
      hours,
      minutes,
      instagram,
      phone,
      honey,
      readTerms,
      readInfo,
    );

    if (!result.valid) {
      throw new Error(result.message);
    }

    try {
      // 1 Create auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      //send email verification
      await sendEmailVerification(userCredential.user);

      //Create user uid
      const uid = userCredential.user.uid;

      const generateID = () => {
        return Math.random().toString(36).substring(2, 9);
      };

      const id = generateID();

      // 2 Upload image
      const imageURL = picture ? await uploadImageAsync(picture, uid) : null;

      // 3 Create Firestore user doc
      await setDoc(doc(db, "users", uid), {
        id,
        bandName,
        email,
        location,
        genre,
        pricePerHour,
        bio,
        picture: imageURL,
        hours,
        minutes,
        instagram,
        phone,
        createdAt: serverTimestamp(),
      });

      return { success: true };
    } catch (error: any) {
      throw new Error(error.message || "Signup failed");
    }
  };

  return { signup };
}
