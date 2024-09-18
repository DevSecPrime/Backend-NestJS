import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/user.dtos';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    createUser(createUserDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUser(id: number, createUserDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllUsers(res: Response): Promise<Response<any, Record<string, any>>>;
    getSingleUser(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUser(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
