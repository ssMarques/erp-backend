import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

// Gera o hash da senha
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Compara senha informada com o hash armazenado
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
