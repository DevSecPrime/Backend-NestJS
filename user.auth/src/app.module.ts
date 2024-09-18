import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from '../orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/users/users.module';
import { AccesTokenModuleModule } from './api/acess_token/acces_token.module.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UsersModule, AccesTokenModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
