import UserModel from '../models/user.model';

class AuthService {
  async checkIfUserExists(email: { email: string }) {
    try {
      const existingUser = await UserModel.findOne(email);
      return existingUser;
    } catch (error) {
      console.error('Error checking user existence:', error);
      throw new Error('Error al comprobar la existencia del usuario');
    }
  }

  async findUserById(uuid: string) {
    try {
      const user = await UserModel.findById(uuid);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new Error('Error al buscar el usuario por ID');
    }
  }
}

export const authService = new AuthService();
