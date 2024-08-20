import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';

class UserController {
  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserModel.find();
      return res.status(200).json({
        success: true,
        data: users.map((user) => ({
          name: user.username,
          uuid: user.id,
        })),
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener las tareas.',
        error: error.message,
      });
    }
  }
}

export const usersController = new UserController();
