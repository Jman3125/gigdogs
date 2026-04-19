import { auth, db } from "@/config/firebaseConfig";
import { uploadImageAsync } from "@/utilities/upload-image";
import {
  validateSignupFieldsArtist,
  validateSignupFieldsVenue,
} from "@/utilities/validate/authenticate-signup";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

//Process user signup for venues and artists
export function useSignupArtist() {
  const signup = async (
    artistName: string,
    email: string,
    password: string,
    password2: string,
    genre: string,
    bio: string,
    picture: string,
    //Socials
    instagram: string,
    facebook: string,
    phone: string,
    honey: string,
    readTerms: boolean,
    readInfo: boolean,
  ) => {
    // Validate fields
    const result = validateSignupFieldsArtist(
      artistName,
      email,
      password,
      password2,
      genre,
      bio,
      picture,
      instagram,
      facebook,
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
      console.log(
        "sendEmailVerification: starting for user",
        userCredential.user.uid,
      );
      await sendEmailVerification(userCredential.user);
      console.log("sendEmailVerification: success - verification email sent");

      //Create user uid
      const uid = userCredential.user.uid;

      const generateID = () => {
        return Math.random().toString(36).substring(2, 9);
      };

      const id = generateID();

      const role = "artist";

      // 2 Upload image
      const imageURL = picture ? await uploadImageAsync(picture, uid) : null;

      // 3 Create Firestore user doc for artists
      await setDoc(doc(db, "users", uid), {
        id,
        role,
        artistName,
        email,
        location,
        genre,
        bio,
        picture: imageURL,
        instagram,
        facebook,
        phone,
        createdAt: serverTimestamp(),
      });

      return { success: true };
    } catch (error: any) {
      console.error("Signup error:", {
        code: error.code,
        message: error.message,
        fullError: error,
      });
      throw new Error(error.message || "Signup failed");
    }
  };

  return { signup };
}

export function useSignupVenue() {
  const signup = async (
    venueName: string,
    email: string,
    password: string,
    password2: string,
    state: string,
    address: string,
    picture: string,
    website: string,
    instagram: string,
    facebook: string,
    phone: string,
    honey: string,
    readTerms: boolean,
    readInfo: boolean,
  ) => {
    // Validate fields
    const result = validateSignupFieldsVenue(
      venueName,
      email,
      password,
      password2,
      state,
      address,
      picture,
      website,
      instagram,
      facebook,
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

      const role = "venue";

      // 2 Upload image
      const imageURL = picture ? await uploadImageAsync(picture, uid) : null;

      // 3 Create Firestore user doc
      await setDoc(doc(db, "venues", uid), {
        id,
        role,
        venueName,
        email,
        address,
        state,
        picture: imageURL,
        website,
        instagram,
        facebook,
        phone,
        createdAt: serverTimestamp(),
      });

      return { success: true };
    } catch (error: any) {
      console.error("Signup error:", {
        code: error.code,
        message: error.message,
        fullError: error,
      });
      throw new Error(error.message || "Signup failed");
    }
  };

  return { signup };
}
