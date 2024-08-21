import { BadRequestError, UnauthorizedError } from '../errors/HttpError';
import { User, UserModel } from '../models/user.model';
import { comparePasswords, hashPassword } from '../utils/bcryptHelpers.util';
import { createAccessToken, verifyToken } from '../utils/jwt.util';

class AuthService {
  async register(userData: User) {
    const { email, password, role, username } = userData;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('El usuario ya está registrado.');
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new UserModel({ email, role, username, password: hashedPassword, credits: 0 });
    return await newUser.save();
  }

  async login(email: string, password: string) {
    const userFound = await UserModel.findOne({ email });

    if (!userFound) {
      throw new BadRequestError('Credenciales incorrectas.');
    }

    const isMatch = await comparePasswords(password, userFound.password);
    if (!isMatch) {
      throw new BadRequestError('Credenciales incorrectas.');
    }

    const token = await createAccessToken({ uuid: userFound._id.toString(), role: userFound.role });
    return { token, user: userFound };
  }

  async logout() {
    return new Date(0);
  }

  async getProfile(uuid: string) {
    const userRequest = await UserModel.findById(uuid);

    if (!userRequest) {
      throw new BadRequestError('Usuario no encontrado.');
    }

    return userRequest;
  }

  async verifyToken(token: string) {
    const payload = await verifyToken(token);
    const userFound = await UserModel.findById(payload.uuid);

    if (!userFound) {
      throw new UnauthorizedError('No autorizado. Usuario no encontrado.');
    }

    return userFound;
  }
}

export const authService = new AuthService();
