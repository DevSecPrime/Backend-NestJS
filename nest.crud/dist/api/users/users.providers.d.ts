import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';
export declare const userProvider: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<UserEntity>;
    inject: string[];
}[];
