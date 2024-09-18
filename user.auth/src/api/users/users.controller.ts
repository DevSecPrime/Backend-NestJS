import {
  Controller,
  Post,
  Res,
  Body,
  UseFilters,
  HttpStatus,
  Next,
  UsePipes,
  ValidationPipe,
  Get,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { Request, Response, NextFunction } from 'express';
import { HttpExceptionFilter } from 'src/comman/middleware/exception.filter';
import { BADRequestException } from 'src/comman/exceptions/badRequest.exception';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { UsersModel } from 'src/models/user.model';
import { AccessTokenService } from '../acess_token/access.token';
import { NOTFoundException } from 'src/comman/exceptions/notFound.exception';
import { AuthGuard } from '@nestjs/passport';
import { AuthRevocationGuard } from 'src/comman/middleware/auth.middleware';

interface AuthRequest extends Request {
  user: {
    sub: number;
    email: string;
  };
}
@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    private authService: UsersService,
    private accessTokenService: AccessTokenService,
  ) {}

  /**
   * Register new user
   * @param createUserDto Object
   * @param res Object
   * @param next Error
   * @returns
   */
  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(
    @Body() createUserDto: UserDto,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      //check if user already exists
      const user = await this.authService.findByemail(createUserDto.email);
      if (user) {
        throw new BADRequestException('User already registerd');
      }
      //encrypt password
      const hashPassword = await bcrypt.hash(createUserDto.password, 12);
      if (!hashPassword) {
        throw new BADRequestException(
          'Something went wrong while encrypting password',
        );
      }
      //store user with encrypted password
      const newUser = await this.authService.createuser({
        ...createUserDto,
        password: hashPassword,
      });

      const token = await this.accessTokenService.creatToken(
        newUser.id,
        newUser.email,
      );
      //transform the data
      const transformedUser = plainToInstance(UsersModel, newUser, {
        excludeExtraneousValues: true,
      });
      //send response
      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        data: transformedUser,
        accessToken: token,
        message: 'User created successfully.',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   *  Login
   * @param createUserDto Object
   * @param res Objct
   * @param next
   * @returns
   */
  @Post('/login')
  async login(
    @Body() createUserDto: UserDto,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      //get email and password form userDto
      const { email, password } = createUserDto;
      //chck if email is exist or not
      const user = await this.authService.findByemail(email);
      if (!user) {
        throw new NOTFoundException('User not found.');
      }
      //compare password
      await this.authService.comparePassword(password, user.password);
      //if password is matched generate a token
      const token = await this.accessTokenService.creatToken(user.id, email);
      //transform the data in user model
      const transformedUser = plainToInstance(UsersModel, user, {
        excludeExtraneousValues: true,
      });
      //send response
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: transformedUser,
        accessToken: token,
        message: 'User logged in successfully.',
      });
    } catch (error) {
      return next(error);
    }
  }
  /**
   * Get profile information
   * @param req
   * @param res Object
   * @param next
   * @returns
   */
  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthRevocationGuard)
  async getProfile(
    @Req() req: AuthRequest,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      //get user id from req.user
      const userId = req.user.sub;
      //find user by id
      const user = await this.authService.findById(userId);
      if (!user) {
        throw new NOTFoundException('User not found.');
      }
      //get user
      //transform
      const transformedUser = plainToInstance(UsersModel, user, {
        excludeExtraneousValues: true,
      });
      //send response
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: transformedUser,
        message: 'User profile fetched successfully.',
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Log out user
   * @param req object
   * @param res
   * @param next
   * @returns
   */
  @Post('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(
    @Req() req: AuthRequest,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      //get user id req.user
      const userId = req.user?.sub;
      if (!userId) {
        throw new NOTFoundException('User not found.');
      }
      //find user by id
      const user = await this.authService.findById(userId);
      if (!user) {
        throw new NOTFoundException('User not found.');
      }
      console.log('User data', user);
      //get token data

      const tokenData = await this.accessTokenService.findByToken(userId);
      console.log('Token data:', tokenData);
      //check token valididty
      if (tokenData.isRevoked == false) {
        //revokw the token
        await this.accessTokenService.revokeToken(tokenData.id);
        //send response
        return res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          message: 'User logged out successfully.',
        });
      } else {
        throw new BADRequestException('Token is already revoked.');
      }
    } catch (error) {
      return next(error);
    }
  }

  @Delete('/delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteAccount(
    @Req() req: AuthRequest,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      //get userId form req.user
      const userId = req.user.sub;

      //get user by id
      const user = await this.authService.findById(userId);
      if (!user) {
        throw new NOTFoundException('User already deleted.');
      }

      //if got delete the user
      await this.authService.removeAccount(userId);

      //return response
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'User deleted successfully.',
      });
    } catch (error) {
      return next(error);
    }
  }
}
