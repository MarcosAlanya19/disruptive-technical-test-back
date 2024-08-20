import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { IsBoolean, IsNotEmpty, Length } from 'class-validator';

@modelOptions({ schemaOptions: { collection: 'themes' } })
class Theme {
  @prop({ required: true, unique: true })
  @IsNotEmpty({ message: 'El nombre de la temática no puede estar vacío.' })
  @Length(3, 50, { message: 'El nombre de la temática debe tener entre 3 y 50 caracteres.' })
  public name!: string;

  @prop({ type: Boolean, default: false })
  @IsBoolean({ message: 'El valor de permitir imágenes debe ser un booleano.' })
  public allowsImages!: boolean;

  @prop({ type: Boolean, default: false })
  @IsBoolean({ message: 'El valor de permitir videos debe ser un booleano.' })
  public allowsVideos!: boolean;

  @prop({ type: Boolean, default: false })
  @IsBoolean({ message: 'El valor de permitir textos debe ser un booleano.' })
  public allowsTexts!: boolean;
}

const ThemeModel = getModelForClass(Theme);
export type TypeTheme = InstanceType<typeof ThemeModel>;
export { Theme, ThemeModel };
