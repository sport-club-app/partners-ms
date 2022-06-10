import { Response, Request, NextFunction } from "express"

export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
    UNPROCESSABLE_ENTITY = 422
}

export interface IErrorHandlerMethods{
    logError(err: any): Promise<void>
    logErrorMiddleware(error: any, req: Request, res: Response, next: NextFunction): Promise<void>
    returnError(error: any, req: Request, res: Response, next: NextFunction): Promise<Response<any>>
    isOperationalError(error: any): Promise<boolean>
}
