import { Response } from 'express';

export class ErrorHandler extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
/**
 * Success send status response
 * @param  {ErrorHandler} err Message of error
 * @param  {Response} res Response express
 */
export const handleError = (err: ErrorHandler, res: Response) => {
  const { message } = err;
  const statusCode = err.statusCode ? err.statusCode : 500;

  res.status(statusCode).json(
      {
        status: 'error',
        statusCode,
        message,
      },
  );
};
