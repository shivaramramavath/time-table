import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: Partial<User>): Promise<User> {
    try {
      return await this.userRepository.create(user);
    } catch (error: any) {
      if (error?.code === 11000) {
        if (error?.keyPattern?.email)
          throw new ConflictException('Email is already registered');

        throw new ConflictException('User already exists');
      }

      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    return user;
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    return user;
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    return user;
  }

  async update(userId: string, dto: UpdateUserDto) {
    return this.userRepository.update(userId, dto);
  }

  async updatePassword(userId: string, password: string) {
    if (!password) {
      throw new BadRequestException('Password is required');
    }
    return this.userRepository.updatePassword(userId, password);
  }
}
