import { NextFunction, Request, Response } from 'express';
import { UserRequest } from '../types/authRequest';
import { verifyToken } from '../utils/jwt.util';

export const authRequired = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o formato incorrecto', success: false });
  }

  const token = authHeader.substring(7);

  try {
    const payload = await verifyToken(token);
    (req as UserRequest).user = payload;
    req.body.userId = payload.uuid;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido', success: false });
  }
};
