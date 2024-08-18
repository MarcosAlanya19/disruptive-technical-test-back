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
}

export const authService = new AuthService();
