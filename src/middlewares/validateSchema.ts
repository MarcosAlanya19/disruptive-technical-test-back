import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export function validateSchema(schema: new () => any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const data = plainToClass(schema, req.body);
    const errors: ValidationError[] = await validate(data);

    if (errors.length > 0) {
      const errorMessages = errors.map((err) => Object.values(err.constraints || {})).flat();
      return res.status(400).json({
        success: false,
        message: errorMessages,
      });
    }

    next();
  };
}
