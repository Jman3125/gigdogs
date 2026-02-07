import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const uploadImageAsync = async (uri: string, uid: string) => {
  // Convert URI to blob
  const response = await fetch(uri);
  const blob = await response.blob();

  // Create storage ref
  const storage = getStorage();
  const storageRef = ref(storage, `profileImages/${uid}.jpg`);

  // Upload blob
  await uploadBytes(storageRef, blob);

  // Get download URL
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};
