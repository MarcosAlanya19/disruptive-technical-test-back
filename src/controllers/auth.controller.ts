import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { comparePasswords, hashPassword } from '../utils/bcryptHelpers.util';
import { createAccessToken } from '../utils/jwt.util';
import { authService } from '../services/auth.services';

class AuthController {
  async register(req: Request, res: Response): Promise<Response> {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere correo electrónico, contraseña y nombre de usuario.',
      });
    }

    try {
      const existingUser = await authService.checkIfUserExists({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'El usuario ya está registrado.',
        });
      }

      const hashedPassword = await hashPassword(password);
      const newUser = new UserModel({ email, password: hashedPassword, username });
      const userSaved = await newUser.save();

      const token = await createAccessToken({ uuid: userSaved._id.toString() });
      res.cookie('token', token);

      return res.status(201).json({
        success: true,
        message: 'Registro exitoso.',
        data: {
          uuid: userSaved._id,
          username: userSaved.username,
          email: userSaved.email,
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

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Correo electrónico y contraseña son obligatorios.',
      });
    }

    try {
      const userFound = await authService.checkIfUserExists({ email });
      if (!userFound) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado.',
        });
      }

      const isMatch = await comparePasswords(password, userFound.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Credenciales incorrectas.',
        });
      }

      const token = await createAccessToken({ uuid: userFound._id.toString() });
      res.cookie('token', token);

      return res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso.',
        data: {
          uuid: userFound._id,
          username: userFound.username,
          email: userFound.email,
          createdAt: userFound.createdAt,
          updatedAt: userFound.updatedAt,
        },
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al iniciar sesión.',
        error: error.message,
      });
    }
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
}

export const authController = new AuthController();
