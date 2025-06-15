import bcrypt from "bcryptjs";

/**
 * Compare plaintext and hashed password
 * @param inputPassword - The raw password user enters
 * @param hashedPassword - The stored hash in the database
 */
export async function validatePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(inputPassword, hashedPassword);
}
