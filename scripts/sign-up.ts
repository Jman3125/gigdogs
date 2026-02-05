// Process user sign in
import { Band } from "@/models/band";

// Utility function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Utility function to hash password (simple example, replace with bcrypt in production)
function hashPassword(password: string): string {
  // This is just a placeholder hash for demonstration
  return Buffer.from(password).toString("base64");
}

// Signup function
export default function signup(
  id: string,
  bandName: string,
  email: string,
  password: string,
  genre: string,
  pricePerHour: number,
  bio: string,
  picture: string,
  hours: number,
  minutes: number,
  instagram: string,
): Band | Error {
  //Generate Random ID ********

  // Input validation
  if (!bandName.trim()) {
    return new Error("Username cannot be empty.");
  }
  if (!isValidEmail(email)) {
    return new Error("Invalid email format.");
  }
  if (password.length < 6) {
    return new Error("Password must be at least 6 characters long.");
  }

  // Create user object
  const newBand: Band = {
    id,
    bandName,
    email,
    password: password,
    genre,
    pricePerHour,
    bio,
    picture,
    setTime: { hours, minutes },
    instagram,
  };

  // In a real app, save newUser to a database here

  console.log("Saving to database a new band: ", newBand);

  return newBand;
}
