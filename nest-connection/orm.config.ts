import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Table } from './src/table.entity';
export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'test',
  entities: [Table],
  synchronize: true,
};
