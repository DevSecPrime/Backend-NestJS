import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Auth } from '../../entity/users.entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/comman/passport/jwt.stratgy';
// import { AccessTokenService } from '../../acess_token/access.token';
import { AccesTokenModuleModule } from '../acess_token/acces_token.module.module';
@Module({
  imports: [TypeOrmModule.forFeature([Auth]), AccesTokenModuleModule],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
