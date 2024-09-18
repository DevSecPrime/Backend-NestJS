import { UserEntity } from './user.entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/user.dtos';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    findbyId(id: number): Promise<UserEntity>;
    updateUser(id: number, createUserDto: CreateUserDto): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[]>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
