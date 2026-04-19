import { auth, db } from "@/config/firebaseConfig";
import { uploadImageAsync } from "@/utilities/upload-image";
import {
  validateUpdateFieldsArtist,
  validateUpdateFieldsVenue,
} from "@/utilities/validate/authenticate-update";
import { doc, updateDoc } from "firebase/firestore";

//update artist account
export function useUpdateArtist() {
  const update = async (
    artistName: string,
    genre: string,
    bio: string,
    picture: string,
    instagram: string,
    facebook: string,
    phone: string,
  ) => {
    // Validation
    //ensure no fields are empty
    // Validate fields
    const result = validateUpdateFieldsArtist(
      artistName,
      genre,
      bio,
      picture,
      instagram,
      facebook,
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
        artistName,
        location,
        genre,
        bio,
        picture: imageURL,
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

//update venue account
export function useUpdateVenue() {
  const update = async (
    venueName: string,
    address: string,
    state: string,
    picture: string,
    website: string,
    instagram: string,
    facebook: string,
    phone: string,
  ) => {
    // Validation
    //ensure no fields are empty
    // Validate fields
    const result = validateUpdateFieldsVenue(
      venueName,
      address,
      state,
      picture,
      website,
      instagram,
      facebook,
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

      await updateDoc(doc(db, "venues", user.uid), {
        venueName,
        address,
        state,
        picture,
        website,
        instagram,
        facebook,
        phone,
      });

      return { success: true };
    } catch (error: any) {
      throw new Error(error.message || "Update failed");
    }
  };

  return { update };
}
