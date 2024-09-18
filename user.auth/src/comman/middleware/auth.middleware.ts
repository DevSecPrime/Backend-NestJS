import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AccessTokenService } from 'src/api/acess_token/access.token';
import { UnauthorisedException } from '../exceptions/unAuthorization.exception';
import * as jsonwebtoken from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NOTFoundException } from '../exceptions/notFound.exception';
dotenv.config();

@Injectable()
export class AuthRevocationGuard implements CanActivate {
  constructor(private readonly accessTokenService: AccessTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    try {
      // Get the token from the Authorization header
      const authorizationHeader = request.header('Authorization');
      if (!authorizationHeader) {
        throw new NOTFoundException('Authorization header is missing.');
      }

      const token = authorizationHeader.replace('Bearer ', '');
      if (!token) {
        throw new NOTFoundException('Token is not provided.');
      }

      // Verify the token using the secret
      let decoded: any;
      try {
        decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        // This block will handle invalid or expired tokens
        throw new UnauthorisedException('Token is invalid or has expired.');
      }

      // Check if the token has already been revoked
      const storedToken = await this.accessTokenService.findToken(decoded.jti); // Assuming jti is token identifier
      if (!storedToken) {
        throw new NOTFoundException('Token not found in the system.');
      }

      if (storedToken.isRevoked == true) {
        throw new UnauthorisedException('Token has been revoked.');
      }

      // Attach user information to the request
      request.user = decoded;
      return true; // Proceed with the request
    } catch (error) {
      throw error; // Re-throw the error to be handled elsewhere in your application
    }
  }
}
