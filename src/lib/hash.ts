import bcrypt from 'bcryptjs';

/**
 * Hashes a plain text password using bcrypt.
 * @param password - The plain text password to hash.
 * @returns The hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
}

/**
 * Verifies a plain text password against a hashed password.
 * @param plainPassword - The user's input password.
 * @param hashedPassword - The stored hashed password.
 * @returns True if the password is correct, false otherwise.
 */
export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
