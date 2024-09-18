import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from './user.entity/user.entity';
import { userProvider } from './users.providers';
import { DatabaseModule } from 'src/comman/config/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userProvider, UsersService],
})
export class UsersModule {}
