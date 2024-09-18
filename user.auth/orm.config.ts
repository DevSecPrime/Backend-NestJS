import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Auth } from 'src/entity/users.entity/users.entity';
import { AccessToken } from 'src/entity/access_token.entity/access_token';
dotenv.config();
//connect ewith databsse externly
export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Auth, AccessToken],
  synchronize: true,
};
