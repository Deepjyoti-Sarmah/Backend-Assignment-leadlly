import { Request, Response, NextFunction } from 'express';

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => async (req: Request, res: Response, next: NextFunction) => {
 try {
    await fn(req, res, next);
 } catch (error: any) { // Using 'any' for the error type as it's a generic catch block
    res.status(error.code || 500).json({
      success: false,
      message: error.message
    });
 }
}

export { asyncHandler };
