// Utility function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//When the user wants to update their email
export function validateUserEmailUpdate(email: string) {
  if (!email.trim()) {
    return { valid: false, message: "Please add your email." };
  }
  if (!isValidEmail(email)) {
    return { valid: false, message: "Please enter a valid email." };
  }

  return { valid: true };
}
