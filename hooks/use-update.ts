import { auth, db } from "@/config/firebaseConfig";
import { validateUpdateFields } from "@/utilities/authenticate/authenticate-update";
import { uploadImageAsync } from "@/utilities/upload-image";
import { doc, updateDoc } from "firebase/firestore";

//update user account
export function useUpdate() {
  const update = async (
    bandName: string,
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

      let imageURL = picture; // default to existing URL

      //if it's a new image being uploaded or existing one
      //file:// tells me it's a file from device not firebase.
      if (picture.startsWith("file://")) {
        imageURL = await uploadImageAsync(picture, user.uid);
      }

      await updateDoc(doc(db, "users", user.uid), {
        bandName,
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
