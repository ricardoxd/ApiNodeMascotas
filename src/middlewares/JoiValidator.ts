import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../helpers/ErrorHandler';
import { ValidationErrorItem, ObjectSchema } from '@hapi/joi';

export const JoiValidator = (schema: ObjectSchema<any>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const details: ValidationErrorItem[] | undefined = error?.details;
      const message = details?.map((i) => i.message).join(',');
      next(new ErrorHandler(412, `INVALID: ${message}`));
    }
  };
};
