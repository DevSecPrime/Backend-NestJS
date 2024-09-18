import { Injectable, Inject } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/user.dtos';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Create user entity
   * @param createUserDto object
   * @returns
   */
  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  /**
   * find user email
   * @param email
   * @returns
   */
  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
  async findbyId(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
  /**
   * Update user
   * @param id
   * @param createUserDto
   * @returns
   */
  async updateUser(id: number, createUserDto: CreateUserDto) {
    await this.userRepository.update(id, createUserDto);
    return await this.userRepository.findOne({ where: { id } });
  }

  /**
   * Get all users
   * @returns
   */
  async getAllUsers() {
    return await this.userRepository.createQueryBuilder('user').getMany();
  }

  /**
   * Delete user
   * @param id
   * @returns
   */
  async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }
}
