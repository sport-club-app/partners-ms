import { UpdateResult, DeleteResult } from "typeorm"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { APIError } from "@/app/exceptions/base-error"
export interface IRepositoryDbMethodsBase<T> {
    create(data: T | T[]): Promise<T>;
    find(filter?: object): Promise<T | T[]>;
    findOne(filter?: object | number): Promise<T> | APIError;
    delete(id: number, filter?: number): Promise<DeleteResult>;
    update(id: number, data: T): Promise<UpdateResult>;
}
