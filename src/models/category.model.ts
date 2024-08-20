import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { IsNotEmpty, IsUrl, Length } from 'class-validator';

@modelOptions({ schemaOptions: { collection: 'categories' } })
class Category {
  @prop({ required: true, unique: true })
  @IsNotEmpty({ message: 'El nombre de la categoría no puede estar vacío.' })
  @Length(3, 50, { message: 'El nombre de la categoría debe tener entre 3 y 50 caracteres.' })
  public name!: string;

  @prop({ required: true })
  @IsNotEmpty({ message: 'La URL de la imagen es obligatoria.' })
  @IsUrl({}, { message: 'La URL de la imagen no es válida.' })
  public image!: string;
}

const CategoryModel = getModelForClass(Category);
export type TypeCategory = InstanceType<typeof Category>;
export { Category, CategoryModel };
