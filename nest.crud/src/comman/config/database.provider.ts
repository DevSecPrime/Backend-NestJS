import { DataSource } from 'typeorm';
import { UserEntity } from 'src/api/users/user.entity/user.entity';
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'test',
        entities: [UserEntity],
        synchronize: true,
      });
      try {
        await dataSource.initialize();
        console.log('Database connection established successfully');
      } catch (error) {
        console.error('Database connection failed:', error);
      }

      return dataSource;
    },
  },
];
