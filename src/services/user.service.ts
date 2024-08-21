import { UserModel } from '../models/user.model';

class UserService {
  async getUsers() {
    return await UserModel.find();
  }
}

export const userService = new UserService();
