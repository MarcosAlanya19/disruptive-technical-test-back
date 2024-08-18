import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { User } from './user.model';

class Task extends TimeStamps {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true, unique: true })
  public description!: string;

  @prop({ required: true, type: Date })
  public date!: Date;

  @prop({ required: true, ref: () => User })
  public user!: Ref<User>;
}

const TaskModel = getModelForClass(Task);
export type TypeTask = InstanceType<typeof TaskModel>;
export default TaskModel;
