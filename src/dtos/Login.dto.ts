import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  public email!: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  public password!: string;
}