import { Request, Response, NextFunction } from "express";

interface AsyncHandler {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

const asyncHandler =
  (fn: AsyncHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      res.status(error.code || 500).json({
        success: false,
        message: error.message,
      });
    }
  };

export { asyncHandler };
