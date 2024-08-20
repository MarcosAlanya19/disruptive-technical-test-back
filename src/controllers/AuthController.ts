import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from '../errors/HttpError';
import { User, UserModel } from '../models/user.model';
import { authService } from '../services/AuthService';
import { hashPassword } from '../utils/bcryptHelpers.util';
import { verifyToken } from '../utils/jwt.util';

class AuthController {
  async register(req: Request, res: Response): Promise<Response> {
    const { email, password, role, username } = req.body as User;

    try {
      const existingUser = await authService.checkIfUserExists({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'El usuario ya está registrado.',
        });
      }

      const hashedPassword = await hashPassword(password);
      const newUser = new UserModel({ email, role, username, password: hashedPassword });
      const userSaved = await newUser.save();

      return res.status(201).json({
        success: true,
        message: 'Registro exitoso.',
        data: {
          uuid: userSaved._id,
          username: userSaved.username,
          email: userSaved.email,
          role: userSaved.role,
        },
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al registrar el usuario.',
        error: error.message,
      });
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      throw new InternalServerError('texto');
    } catch (error) {
      console.log(error);
      next(error);
    }
    // const { email, password } = plainToClass(UserModel, req.body);
    // const errors = await validate({ email, password });

    // if (errors.length > 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: errors.map((err) => Object.values(err.constraints || {})).flat(),
    //   });
    // }

    // try {
    //   const userFound = await authService.checkIfUserExists({ email });

    //   if (!userFound) {
    //     return res.status(404).json({
    //       success: false,
    //       message: 'Credenciales incorrectas.',
    //     });
    //   }

    //   const isMatch = await comparePasswords(password, userFound.password);
    //   if (!isMatch) {
    //     return res.status(400).json({
    //       success: false,
    //       message: 'Credenciales incorrectas.',
    //     });
    //   }

    //   const token = await createAccessToken({ uuid: userFound._id.toString(), role: userFound.role });
    //   res.cookie('token', token);

    //   return res.status(200).json({
    //     success: true,
    //     message: 'Inicio de sesión exitoso.',
    //     data: {
    //       uuid: userFound._id,
    //       username: userFound.username,
    //       email: userFound.email,
    //       createdAt: userFound.createdAt,
    //       updatedAt: userFound.updatedAt,
    //       role: userFound.role,
    //     },
    //   });
    // } catch (error: any) {
    //   return res.status(500).json({
    //     success: false,
    //     message: 'Error al iniciar sesión.',
    //     error: error.message,
    //   });
    // }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    try {
      res.cookie('token', '', {
        expires: new Date(0),
      });

      return res.status(200).json({
        success: true,
        message: 'Sesión cerrada exitosamente.',
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al cerrar sesión.',
        error: error.message,
      });
    }
  }

  async profile(req: Request, res: Response): Promise<Response> {
    const userRequest = await authService.findUserById((req as any).user.uuid);

    try {
      if (!userRequest) {
        return res.status(409).json({
          success: false,
          message: 'Usuario no encontrado.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Usuario encontrado con exito.',
        data: {
          uuid: userRequest._id,
          username: userRequest.username,
          email: userRequest.email,
          createdAt: userRequest.createdAt,
          updatedAt: userRequest.updatedAt,
        },
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el perfil del usuario.',
        error: error.message,
      });
    }
  }

  async verifyToken(req: Request, res: Response): Promise<Response> {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado. Token no proporcionado.',
      });
    }

    try {
      const payload = await verifyToken(token);
      const userFound = await authService.findUserById(payload.uuid);

      if (!userFound) {
        return res.status(401).json({
          success: false,
          message: 'No autorizado. Usuario no encontrado.',
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          uuid: userFound._id,
          username: userFound.username,
          email: userFound.email,
          role: userFound.role,
        },
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar el token.',
        error: error.message,
      });
    }
  }
}

export const authController = new AuthController();
