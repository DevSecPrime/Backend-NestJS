import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as jsonwebtoken from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken } from 'src/entity/access_token.entity/access_token';
import { Repository } from 'typeorm';
import * as moment from 'moment';

dotenv.config();

@Injectable()
export class AccessTokenService {
  constructor(
    @InjectRepository(AccessToken)
    private accessTokenRepository: Repository<AccessToken>,
  ) {}

  /**
   * Create token
   * @param userId number
   * @param email string
   * @returns
   */
  async creatToken(userId: number, email: string): Promise<string> {
    const jti = crypto.randomBytes(18).toString('hex');
    const payload = {
      jti: jti,
      sub: userId,
      email: email,
    };
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    // console.log('token', token);
    const decodedToken = jsonwebtoken.decode(token);
    // console.log('decodedToken:', decodedToken);

    await this.storeToken(userId, jti, decodedToken);

    return token;
  }

  /**
   * Store token
   * @param userId number
   * @param jti string
   * @param decodedToken
   */
  async storeToken(
    userId: number,
    jti: string,
    decodedToken: any,
  ): Promise<void> {
    const accessToken = new AccessToken();
    accessToken.id = jti;
    accessToken.user = { id: userId } as any;
    accessToken.expiresAt = moment.unix(decodedToken.exp).toDate() as any;
    await this.accessTokenRepository.save(accessToken);
  }

  /**
   * Find token by user id
   * @param userId number
   * @returns
   */
  async findByToken(userId: number): Promise<any> {
    return await this.accessTokenRepository
      .createQueryBuilder('access_token')
      .where({
        user: { id: userId },
      })
      .orderBy('createdAt', 'DESC')
      .getOne();
  }

  /**
   * Revoke token
   * @param tokenId string
   */
  async revokeToken(tokenId: string): Promise<void> {
    await this.accessTokenRepository.update(tokenId, { isRevoked: true });
  }

  /**
   * Find token by token identifier
   * @param tokenId string
   * @returns
   */

  async findToken(tokenId: string): Promise<any> {
    const token = await this.accessTokenRepository.findOne({
      where: { id: tokenId },
    });

    return token;
  }
}
