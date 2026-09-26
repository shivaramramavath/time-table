import createHttpError from 'http-errors';
import { User } from './user.model.js';
import { UserRepository } from './user.repository.js';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: User) {
    try {
      return await this.userRepository.create(user);
    } catch (error) {
      if (error?.code === 11000) throw createHttpError.InternalServerError('Failed to create user');
      if (error?.keyPattern?.email) throw createHttpError.Conflict('Email is already registered');
      if (error?.keyPattern?.userName) throw createHttpError.Conflict('Username is already taken');
      throw createHttpError.Conflict('User already exists');
    }
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async findByEmailWithPassword(email: string) {
    return await this.userRepository.findByEmailWithPassword(email);
  }

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }

  async updatePassword(userId: string, password: string) {
    return await this.userRepository.updatePassword(userId, password);
  }
}
