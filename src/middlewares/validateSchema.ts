import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/HttpError';

export function validateSchema(schema: new () => any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("hola")
      const instance = plainToInstance(schema, req.body);

      const errors: ValidationError[] = await validate(instance);

      if (errors.length > 0) {
        throw new BadRequestError('Error de validacion', errors.map((err) => Object.values(err.constraints || {})).flat());
      }

      req.body = instance;
      next();
    } catch (error) {
      next(error);
    }
  };
}
