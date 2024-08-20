import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.util';
import { UserRequest } from '../types/authRequest';

export const authRequired = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Sin token, autorización denegada', success: false });
  }

  try {
    const payload = await verifyToken(token);
    (req as UserRequest).user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'El token no es válido', success: false });
  }
};
