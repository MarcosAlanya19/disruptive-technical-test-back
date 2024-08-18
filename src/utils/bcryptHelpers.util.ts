import bcrypt from 'bcryptjs';

/**
 * Hashea una contraseña utilizando bcrypt.
 * @param password La contraseña a hashear.
 * @param saltRounds Número de rounds para el hash (por defecto 10).
 * @returns La contraseña hasheada.
 */
export const hashPassword = async (password: string, saltRounds: number = 10): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

/**
 * Compara una contraseña sin procesar con una contraseña hasheada.
 * @param password La contraseña sin procesar.
 * @param hashedPassword La contraseña hasheada.
 * @returns `true` si las contraseñas coinciden, `false` en caso contrario.
 */
export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
