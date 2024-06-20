import { Request, Response, NextFunction } from 'express';

const errorHandler = (
 err: any,
 req: Request,
 res: Response,
 next: NextFunction
) => {
 console.error(err,'error from error handler'); 

 const statusCode = err.status || 500;
 const message = err.message || 'Internal Server Error';

 return res.status(statusCode).json({
  success: false,
  status: statusCode,
  message: message,
 });
};

export default errorHandler;
