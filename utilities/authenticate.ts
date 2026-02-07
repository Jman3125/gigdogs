// Utility function to validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Utility function to hash password (simple example, replace with bcrypt in production)
export function hashPassword(password: string): string {
  // This is just a placeholder hash for demonstration
  return Buffer.from(password).toString("base64");
}
