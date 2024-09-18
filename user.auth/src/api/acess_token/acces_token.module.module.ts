import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenService } from './access.token';
import { AccessToken } from 'src/entity/access_token.entity/access_token';

@Module({
  imports: [TypeOrmModule.forFeature([AccessToken])],
  providers: [AccessTokenService],
  exports: [AccessTokenService],
})
export class AccesTokenModuleModule {}
