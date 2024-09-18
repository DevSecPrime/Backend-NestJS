import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../../entity/users.entity/users.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { ConflictException } from 'src/comman/exceptions/conflict.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Auth)
    private userRepository: Repository<Auth>,
  ) {}

  /**
   * Find by email
   * @param email string
   * @returns
   */

  async findByemail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  /**
   * Create new user
   * @param createUserDto Object
   * @returns
   */
  async createuser(createUserDto: UserDto): Promise<Auth> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  /**
   * Compare password
   * @param password string
   * @param hashPassword string
   */
  async comparePassword(password: string, hashPassword: string): Promise<any> {
    const isMatched = await bcrypt.compare(password, hashPassword);
    if (!isMatched) {
      throw new ConflictException('Iavalid Password.');
    }
    return isMatched;
  }
  /**
   * Find by id
   * @param id number
   * @returns
   */
  async findById(id: number): Promise<Auth> {
    console.log('id', id);
    return await this.userRepository.findOne({ where: { id } });
  }

  async removeAccount(userId: number): Promise<any> {
    return await this.userRepository.delete(userId);
  }
}
