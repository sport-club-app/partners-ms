
import { NextFunction, Request, Response } from "express"
import { errorHandlerMiddleware } from "@Middleware/error-handler"
import { APIError } from "src/exceptions/base-error"
import { HttpStatusCode } from "src/exceptions/interfaces"
import businessError from "src/exceptions/business-error"

class AuthMiddleware {
  public async execute (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.toString() || req.headers.token?.toString()
    try {
      if (!token) {
        throw new APIError("INTERNAL_SERVER",
          HttpStatusCode.INTERNAL_SERVER,
          true,
          businessError.GENERIC,
          undefined
        )
      }
      if (!token.split(" ")[1]) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.TOKEN_NOT_FOUND,
          undefined
        )
      }
      next("route")
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }
}

export const authMiddleware = new AuthMiddleware()
