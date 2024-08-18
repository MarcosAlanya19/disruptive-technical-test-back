import jwt from 'jsonwebtoken';
import { config } from '../config';

/**
 * Crea un token de acceso JWT.
 * @param payload.uuid El UUID del usuario para incluir en el token.
 * @returns Una promesa que resuelve con el token de acceso JWT.
 * @throws Error Si ocurre un error al firmar el token.
 */
export const createAccessToken = (payload: { uuid: string }) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.jwt.TOKEN_SECRET, { expiresIn: '30d' }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};
