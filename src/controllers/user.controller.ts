import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/user.service';

class UserController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getUsers();
      return res.status(200).json({
        success: true,
        data: users.map((user) => ({
          name: user.username,
          uuid: user.id,
        })),
      });
    } catch (error: any) {
      next(error)
    }
  }
}

export const userController = new UserController();
