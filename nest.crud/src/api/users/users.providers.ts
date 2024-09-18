import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';
// import { Inject } from '@nestjs/common';
export const userProvider = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
];
