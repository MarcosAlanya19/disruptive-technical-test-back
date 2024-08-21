import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Category } from './category.model';
import { Theme } from './theme.model';
import { User } from './user.model';

@modelOptions({ schemaOptions: { collection: 'contents' } })
class Content {
  @prop({ required: true })
  @IsNotEmpty({ message: 'El título del contenido no puede estar vacío.' })
  @Length(3, 100, { message: 'El título del contenido debe tener entre 3 y 100 caracteres.' })
  public title!: string;

  @prop()
  @IsOptional()
  @IsUrl({}, { message: 'La URL proporcionada no es válida.' })
  public url?: string;

  @prop()
  @IsOptional()
  @IsString({ message: 'El contenido textual debe ser una cadena de texto.' })
  public textContent?: string;

  @prop({ ref: () => Category, required: true })
  @IsNotEmpty({ message: 'La categoría es obligatoria.' })
  public categoryId!: Ref<Category>;

  @prop({ ref: () => Theme, required: true })
  @IsNotEmpty({ message: 'La temática es obligatoria.' })
  public themeId!: Ref<Theme>;

  @prop({ ref: () => User, required: true })
  @IsNotEmpty({ message: 'El user es obligatoria.' })
  public userId!: Ref<User>;
}

const ContentModel = getModelForClass(Content);
export type TypeContent = InstanceType<typeof ContentModel>;

export { Content, ContentModel };
