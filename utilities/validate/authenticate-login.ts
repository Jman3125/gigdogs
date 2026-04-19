// Utility function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//Validate Login Fields
export function validateLoginFields(email: string, password: string) {
  //ensure no fields are empty

  if (!isValidEmail(email)) {
    return { valid: false, message: "Please enter a valid email." };
  }

  if (!email.trim()) {
    return { valid: false, message: "Please add an email." };
  }

  if (!password.trim()) {
    return { valid: false, message: "Please add a password." };
  }

  return { valid: true };
}
