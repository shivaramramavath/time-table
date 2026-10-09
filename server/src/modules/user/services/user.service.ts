import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { User } from '../entities/user.model';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: Partial<User>): Promise<User> {
    try {
      return await this.userRepository.create(user);
    } catch (error: any) {
      if (error?.code === 11000) {
        if (error?.keyPattern?.email) {
          throw new ConflictException('Email is already registered');
        }

        throw new ConflictException('User already exists');
      }

      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    return user;
  }

  async getProfile(userId: string) {
    return this.userRepository.findById(userId);
  }

  async update(userId: string, data: Partial<User>) {
    return this.userRepository.update(userId, data);
  }
}
