import jwt from 'jsonwebtoken';
import { config } from '../config';

export interface IUserPayload {
  uuid: string;
  role: string
}

export const createAccessToken = async (payload: IUserPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.jwt.TOKEN_SECRET, { expiresIn: '30d' }, (err, token) => {
      if (err) {
        reject(new Error('Error al crear el token de acceso.'));
      } else {
        resolve(token as string);
      }
    });
  });
};

export const verifyToken = (token: string): Promise<IUserPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        reject(new Error('Token inválido o expirado.'));
      } else {
        resolve(decoded as IUserPayload);
      }
    });
  });
};
