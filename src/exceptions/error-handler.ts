import { logger } from "@Infra/logger/config"
import { Response, Request, NextFunction } from "express"
import { BaseError } from "./base-error"
import businessError from "./business-error"
import { IErrorHandlerMethods } from "./interfaces"

// free to extend the BaseError

class ErrorHandler implements IErrorHandlerMethods {
  public async logError (err: any) {
    await logger.error(
      "Error message from the centralized error-handling component",
      err
    )
  }

  public async logErrorMiddleware (error: any, req: Request, res: Response, next: NextFunction) {
    if (!error) {
      next("route")
    }
    this.logError(error)
    next(error)
  }

  public async returnError (error: any, req: Request, res: Response, next: NextFunction) {
    return res.status(error.response?.status || error.httpCode || 500).send(error.response?.data || error || businessError.GENERIC)
  }

  public async isOperationalError (error) {
    if (error instanceof BaseError) {
      return error.isOperational
    }
    return false
  }
}
export const errorHandler = new ErrorHandler()
