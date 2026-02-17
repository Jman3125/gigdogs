// Utility function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//Validate Signup Fields

export function validateSignupFields(
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
) {
  //Ensure honeypot field is not filled in
  if (honey.trim()) {
    return { valid: false };
  }

  //ensure no fields are empty
  if (!bandName.trim()) {
    return { valid: false, message: "Please add your band name." };
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

  if (!location.trim()) {
    return { valid: false, message: "Please add a location." };
  }

  if (!genre.trim()) {
    return { valid: false, message: "Please add a genre." };
  }

  if (isNaN(pricePerHour) || pricePerHour <= 0) {
    return { valid: false, message: "Please enter a valid price per hour." };
  }

  if (isNaN(hours) || hours <= 0) {
    return { valid: false, message: "Please enter a valid number of hours." };
  }
  if (isNaN(minutes) || minutes < 0 || minutes > 59) {
    return { valid: false, message: "Please enter a valid number of minutes." };
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

  if (!instagram.trim()) {
    return { valid: false, message: "Please add an Instagram username." };
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

  if (password.length < 8) {
    return {
      valid: false,
      message: "Password must be at least 8 characters long.",
    };
  }

  return { valid: true };
}
