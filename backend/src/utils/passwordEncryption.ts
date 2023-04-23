import bcrypt from 'bcryptjs';

export async function hashPassword(plaintextPassword: string): Promise<string> {
  const hash = await bcrypt.hash(plaintextPassword, 10);
  return hash;
}

export async function comparePassword(plaintextPassword: string, hash: string): Promise<boolean> {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}
