import { getModelForClass, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class User extends TimeStamps {
  @prop({ required: true })
  public username!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;
}

const UserModel = getModelForClass(User);
export type TypeUser = InstanceType<typeof UserModel>;
export default UserModel;
