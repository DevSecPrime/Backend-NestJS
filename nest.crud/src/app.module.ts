import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './comman/config/database.module';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
