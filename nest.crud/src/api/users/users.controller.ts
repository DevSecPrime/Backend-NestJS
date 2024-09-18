import {
  Controller,
  Body,
  Res,
  Get,
  Param,
  Post,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/user.dtos';
import { plainToInstance } from 'class-transformer';
import { UserModel } from 'src/models/user.model';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('CRUD Operation')
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  /**
   * Create new User
   * @param createUserDto object
   * @param res object
   * @returns
   */
  @Post('/create')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          example: 1,
          description: 'Unique user id',
        },
        name: {
          type: 'string',
          example: 'john doe',
          description: 'User name',
        },
        phno: {
          type: 'string',
          example: '9898123694',
          description: 'User phone number',
        },
        email: {
          type: 'string',
          example: 'john.doe@example.com',
          description: 'User email',
        },
        description: {
          type: 'String',
          example: 'description',
          description: 'description',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Conflict',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      //check if user already exists
      const user = await this.service.findByEmail(createUserDto.email);
      if (user) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: HttpStatus.BAD_REQUEST,
          message: 'Email is already in use.',
        });
      }
      //create new user store in database
      const newUser = await this.service.createUser(createUserDto);
      //transfrom  user to new store
      const transformeduser = plainToInstance(UserModel, newUser, {
        excludeExtraneousValues: true,
      });
      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        data: transformeduser,
        message: 'User created successfully.',
      });
    } catch (error) {
      console.log('Error aa gaya ji:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong.',
        error: error.message,
      });
    }
  }

  /**
   * Update user
   * @param id int
   * @param createUserDto object
   * @param res object
   * @returns
   */
  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update user by id',
    description: 'update user with given id',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    required: true,
    description: 'id of user to update',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'john doe',
          description: 'User name',
        },
        phno: {
          type: 'string',
          example: '9898123694',
          description: 'User phone number',
        },
        email: {
          type: 'string',
          example: 'john.doe@example.com',
          description: 'User email',
        },
        description: {
          type: 'String',
          example: 'description',
          description: 'description',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Conflict',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  @UsePipes(ValidationPipe)
  async updateUser(
    @Param('id') id: number,
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      //check if user not foud
      const user = await this.service.findbyId(id);
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: 'User not found.',
        });
      }
      //update user in db
      const updateUser = await this.service.updateUser(id, createUserDto);

      //transform
      const transformUpdatedUser = plainToInstance(UserModel, updateUser, {
        excludeExtraneousValues: true, //converts only exposed values
      });
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: transformUpdatedUser,
        message: 'User updated successfully.',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong.',
        error: error.message,
      });
    }
  }

  /**
   * Get all users
   * @param res array object
   * @returns
   */

  @Get()
  @ApiOperation({
    summary: 'Get all users.',
  })
  @ApiResponse({
    status: 200,
    description: 'Fetched all users successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Conflict',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  async getAllUsers(@Res() res: Response) {
    try {
      const users = await this.service.getAllUsers();
      //transfrom the user
      const transform = plainToInstance(UserModel, users, {
        excludeExtraneousValues: true,
      });
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: transform,
        message: 'Users fetched successfully.',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong.',
        error: error.message,
      });
    }
  }

  /**
   * Get user by id
   * @param id int
   * @param res object
   * @returns
   */

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by id',
    description: 'Get user by id',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'Id of user',
  })
  @ApiResponse({
    status: 200,
    description: 'Fetched all users successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Conflict',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  async getSingleUser(@Param('id') id: number, @Res() res: Response) {
    try {
      const user = await this.service.findbyId(id);
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: 'User not found.',
        });
      }
      const transformedUser = plainToInstance(UserModel, user, {
        excludeExtraneousValues: true,
      });
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: transformedUser,
        message: 'User fetched successfully.',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong.',
        error: error.message,
      });
    }
  }

  /**
   * Delete User
   * @param id int
   * @param res object
   * @returns
   */

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Delete User',
    description: 'Delete user by id',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    required: true,
    description: 'id of user to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Conflict',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  async deleteUser(@Param('id') id: number, @Res() res: Response) {
    try {
      //check if user already exist or not
      const user = await this.service.findbyId(id);
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: 'User not found.',
        });
      }
      await this.service.deleteUser(id);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'User deleted successfully.',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong.',
        error: error.message,
      });
    }
  }
}
