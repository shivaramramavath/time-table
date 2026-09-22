import createHttpError from 'http-errors';
import { UserModel } from './user.model.js';

export class UserRepository {
  constructor(private readonly userModel: typeof UserModel) {}

  async exists(filter: object): Promise<boolean> {
    try {
      const user = await this.userModel.exists(filter);

      return user !== null;
    } catch {
      throw createHttpError.InternalServerError('Failed to check user');
    }
  }

  async create(user: object) {
    try {
      return await this.userModel.create(user);
    } catch (error: any) {
      if (error?.code === 11000) throw createHttpError.InternalServerError('Failed to create user');
      if (error?.keyPattern?.email) throw createHttpError.Conflict('Email is already registered');
      if (error?.keyPattern?.userName) throw createHttpError.Conflict('Username is already taken');
      throw createHttpError.Conflict('User already exists');
    }
  }

  async findOne(filter: object) {
    try {
      return await this.userModel.findOne(filter);
    } catch {
      throw createHttpError.InternalServerError('Failed to find user');
    }
  }

  async findById(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch {
      throw createHttpError.InternalServerError('Failed to find user');
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userModel.findOne({
        email: email.toLowerCase(),
      });
    } catch {
      throw createHttpError.InternalServerError('Failed to find user by email');
    }
  }

  async findByEmailWithPassword(email: string) {
    try {
      return await this.userModel
        .findOne({
          email: email.toLowerCase(),
        })
        .select('+password');
    } catch {
      throw createHttpError.InternalServerError('Failed to find user by email');
    }
  }

  async updatePassword(userId: string, password: string) {
    try {
      return await this.userModel.updateOne(
        { _id: userId },
        {
          $set: {
            password,
          },
        },
      );
    } catch {
      throw createHttpError.InternalServerError('Failed to update password');
    }
  }
}
