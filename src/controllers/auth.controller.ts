import { NextFunction, Request, Response } from 'express';
import { LoginDto } from '../dtos/Login.dto';
import { User } from '../models/user.model';
import { authService } from '../services/auth.service';
import { UserRequest } from '../types/authRequest';

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    const userDto = req.body as User;

    try {
      const userSaved = await authService.register(userDto);
      return res.status(201).json({
        success: true,
        message: 'Registro exitoso.',
        data: {
          uuid: userSaved._id,
          username: userSaved.username,
          email: userSaved.email,
          role: userSaved.role,
          credits: userSaved.credits,
        },
      });
    } catch (error: any) {
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body as LoginDto;
    try {
      const { token, user } = await authService.login(email, password);
      console.log({ token })
      res.cookie('token', token);

      return res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso.',
        data: {
          uuid: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          role: user.role,
          credits: user.credits,
        },
      });
    } catch (error: any) {
      next(error)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.cookie('token', '', {
        expires: await authService.logout(),
      });

      return res.status(200).json({
        success: true,
        message: 'Sesión cerrada exitosamente.',
      });
    } catch (error: any) {
      next(error)
      return res.status(500).json({
        success: false,
        message: 'Error al cerrar sesión.',
        error: error.message,
      });
    }
  }

  async profile(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const user = await authService.getProfile((req as UserRequest).user.uuid);

      return res.status(200).json({
        success: true,
        message: 'Usuario encontrado con éxito.',
        data: {
          uuid: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error: any) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }
  }

  async verifyToken(req: Request, res: Response, next: NextFunction) {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado. Token no proporcionado.',
      });
    }

    try {
      const user = await authService.verifyToken(token);

      return res.status(200).json({
        success: true,
        data: {
          uuid: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          credits: user.credits,
        },
      });
    } catch (error: any) {
      next(error)
    }
  }
}

export const authController = new AuthController();
