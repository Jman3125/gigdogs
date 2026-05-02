// Utility function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//Validate Signup Fields for artists
export function validateSignupFieldsArtist(
  artistName: string,
  email: string,
  password: string,
  password2: string,
  genre: string,
  originalsCovers: string,
  bio: string,
  picture: string,
  instagram: string,
  facebook: string,
  phone: string,
  honey: string,
  readTerms: boolean,
  readInfo: boolean,
) {
  //Ensure honeypot field is not filled in
  if (honey.trim()) {
    return { valid: false };
  }

  //ensure no fields are empty
  if (!artistName.trim()) {
    return { valid: false, message: "Please add your artist name." };
  }

  if (!email.trim()) {
    return { valid: false, message: "Please add an email." };
  }

  if (!password.trim()) {
    return { valid: false, message: "Please add a password." };
  }

  if (password !== password2) {
    return { valid: false, message: "Passwords do not match." };
  }

  if (!genre.trim()) {
    return { valid: false, message: "Please select a genre." };
  }

  if (!originalsCovers.trim()) {
    return { valid: false, message: "Please select originals/covers." };
  }
  if (!picture || !picture.trim()) {
    return { valid: false, message: "Please add a profile picture." };
  }

  if (!bio.trim()) {
    return { valid: false, message: "Please add a bio." };
  }

  if (!phone.trim()) {
    return { valid: false, message: "Please add a phone number." };
  }

  //We only need one social media link
  if (!instagram.trim() && !facebook.trim()) {
    return { valid: false, message: "Please add at least one social link." };
  }

  if (!readTerms) {
    return {
      valid: false,
      message: "Please agree to the terms and conditions.",
    };
  }

  if (!readInfo) {
    return {
      valid: false,
      message: "Please agree to all checkboxes.",
    };
  }

  if (!isValidEmail(email)) {
    return { valid: false, message: "Invalid email format." };
  }

  if (password.length < 6) {
    return {
      valid: false,
      message: "Password must be at least 6 characters long.",
    };
  }

  return { valid: true };
}

//Validate signup fields for venues
export function validateSignupFieldsVenue(
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
  honey: string,
  readTerms: boolean,
  readInfo: boolean,
) {
  //Ensure honeypot field is not filled in
  if (honey.trim()) {
    return { valid: false };
  }

  //ensure no fields are empty
  if (!venueName.trim()) {
    return { valid: false, message: "Please add your venue name." };
  }

  if (!email.trim()) {
    return { valid: false, message: "Please add an email." };
  }

  if (!password.trim()) {
    return { valid: false, message: "Please add a password." };
  }

  if (password !== password2) {
    return { valid: false, message: "Passwords do not match." };
  }

  if (state === "xyz") {
    return { valid: false, message: "Please select a state." };
  }

  if (!address.trim()) {
    return { valid: false, message: "Please add an address." };
  }

  if (!picture || !picture.trim()) {
    return { valid: false, message: "Please add a profile picture." };
  }

  if (!instagram.trim() && !facebook.trim() && !website.trim()) {
    return {
      valid: false,
      message: "Please add at least one social media/website link.",
    };
  }

  if (!readTerms) {
    return {
      valid: false,
      message: "Please agree to the terms and conditions.",
    };
  }

  if (!readInfo) {
    return {
      valid: false,
      message: "Please agree to all checkboxes.",
    };
  }

  if (!isValidEmail(email)) {
    return { valid: false, message: "Invalid email format." };
  }

  if (password.length < 6) {
    return {
      valid: false,
      message: "Password must be at least 6 characters long.",
    };
  }

  return { valid: true };
}
