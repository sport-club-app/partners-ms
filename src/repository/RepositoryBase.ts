import { UpdateResult, DeleteResult } from "typeorm"
export interface IRepositoryDbMethodsBase<T> {
    create(data: T | T[]): Promise<T>;
    find(filter?: object): Promise<T | T[]>;
    findOne(filter?: object | number): Promise<T>;
    delete(id: number, filter?: number): Promise<DeleteResult>;
    update(id: number, data: T): Promise<UpdateResult>;
}
