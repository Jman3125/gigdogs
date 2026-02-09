import { auth, db } from "@/config/firebaseConfig";
import { validateUpdateFields } from "@/utilities/authenticate/authenticate-update";
import { uploadImageAsync } from "@/utilities/upload-image";
import { updateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export function useUpdate() {
  const update = async (
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
  ) => {
    // Validation
    //ensure no fields are empty
    // Validate fields
    const result = validateUpdateFields(
      bandName,
      email,
      location,
      genre,
      pricePerHour,
      bio,
      picture,
      hours,
      minutes,
      instagram,
      phone,
    );

    if (!result.valid) {
      throw new Error(result.message);
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated.");
      }

      if (email !== user.email) {
        await updateEmail(user, email);
      }
      let imageURL = picture; // default to existing URL

      if (picture.startsWith("file://")) {
        imageURL = await uploadImageAsync(picture, user.uid);
      }

      await updateDoc(doc(db, "users", user.uid), {
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
      });

      return { success: true };
    } catch (error: any) {
      throw new Error(error.message || "Update failed");
    }
  };

  return { update };
}
