"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const user_dtos_1 = require("./dtos/user.dtos");
const class_transformer_1 = require("class-transformer");
const user_model_1 = require("../../models/user.model");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    constructor(service) {
        this.service = service;
    }
    async createUser(createUserDto, res) {
        try {
            const user = await this.service.findByEmail(createUserDto.email);
            if (user) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Email is already in use.',
                });
            }
            const newUser = await this.service.createUser(createUserDto);
            const transformeduser = (0, class_transformer_1.plainToInstance)(user_model_1.UserModel, newUser, {
                excludeExtraneousValues: true,
            });
            return res.status(common_1.HttpStatus.CREATED).json({
                status: common_1.HttpStatus.CREATED,
                data: transformeduser,
                message: 'User created successfully.',
            });
        }
        catch (error) {
            console.log('Error aa gaya ji:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong.',
                error: error.message,
            });
        }
    }
    async updateUser(id, createUserDto, res) {
        try {
            const user = await this.service.findbyId(id);
            if (!user) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'User not found.',
                });
            }
            const updateUser = await this.service.updateUser(id, createUserDto);
            const transformUpdatedUser = (0, class_transformer_1.plainToInstance)(user_model_1.UserModel, updateUser, {
                excludeExtraneousValues: true,
            });
            return res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                data: transformUpdatedUser,
                message: 'User updated successfully.',
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong.',
                error: error.message,
            });
        }
    }
    async getAllUsers(res) {
        try {
            const users = await this.service.getAllUsers();
            const transform = (0, class_transformer_1.plainToInstance)(user_model_1.UserModel, users, {
                excludeExtraneousValues: true,
            });
            return res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                data: transform,
                message: 'Users fetched successfully.',
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong.',
                error: error.message,
            });
        }
    }
    async getSingleUser(id, res) {
        try {
            const user = await this.service.findbyId(id);
            if (!user) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'User not found.',
                });
            }
            const transformedUser = (0, class_transformer_1.plainToInstance)(user_model_1.UserModel, user, {
                excludeExtraneousValues: true,
            });
            return res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                data: transformedUser,
                message: 'User fetched successfully.',
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong.',
                error: error.message,
            });
        }
    }
    async deleteUser(id, res) {
        try {
            const user = await this.service.findbyId(id);
            if (!user) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'User not found.',
                });
            }
            await this.service.deleteUser(id);
            return res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                message: 'User deleted successfully.',
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong.',
                error: error.message,
            });
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiBody)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Created.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Conflict',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not Found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error.',
    }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dtos_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update user by id',
        description: 'update user with given id',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'integer',
        required: true,
        description: 'id of user to update',
    }),
    (0, swagger_1.ApiBody)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Created.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Conflict',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not Found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error.',
    }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dtos_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all users.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Fetched all users successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Conflict',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not Found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error.',
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get user by id',
        description: 'Get user by id',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'integer',
        description: 'Id of user',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Fetched all users successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Conflict',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not Found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getSingleUser", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete User',
        description: 'Delete user by id',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'integer',
        required: true,
        description: 'id of user to delete',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User deleted successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Conflict',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not Found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('CRUD Operation'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map