import { NextFunction, Request, Response } from 'express';
import { UserRequest } from '../types/authRequest';
import { verifyToken } from '../utils/jwt.util';

export const authRequired = async (req: Request, res: Response, next: NextFunction) => {
  console.log({ cookies: req.cookies })
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
