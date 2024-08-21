import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';

export enum UserRole {
  READER = 'Reader',
  CREATOR = 'Creator',
  ADMIN = 'Admin',
}

@modelOptions({ schemaOptions: { collection: 'users' } })
export class User extends TimeStamps {
  @prop({ required: true, unique: true })
  @Length(3, 20, { message: 'El nombre de usuario debe tener entre 3 y 20 caracteres.' })
  public username!: string;

  @prop({ required: true, unique: true })
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  public email!: string;

  @prop({ required: false, default: 0 })
  public credits!: number;

  @prop({ enum: UserRole, default: UserRole.READER })
  @IsEnum(UserRole, { message: 'El rol de usuario no es válido.' })
  public role!: UserRole;

  @prop({ required: true })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  public password!: string;
}

export const UserModel = getModelForClass(User);
export type TypeUser = InstanceType<typeof UserModel>;
