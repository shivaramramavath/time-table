import { UserModel } from './user.model.js';
import { errors } from '#utils/errors.js';

export class UserRepository {
  constructor(private readonly userModel: typeof UserModel) {}

  async exists(filter: object): Promise<boolean> {
    try {
      const user = await this.userModel.exists(filter);

      return user !== null;
    } catch {
      throw errors.internal('Failed to check user');
    }
  }

  async create(user: object) {
    try {
      return await this.userModel.create(user);
    } catch (error: any) {
      if (error?.code === 11000) {
        if (error?.keyPattern?.email) {
          throw errors.conflict('Email is already registered');
        }

        if (error?.keyPattern?.userName) {
          throw errors.conflict('Username is already taken');
        }

        throw errors.conflict('User already exists');
      }

      throw errors.internal('Failed to create user');
    }
  }

  async findOne(filter: object) {
    try {
      return await this.userModel.findOne(filter);
    } catch {
      throw errors.internal('Failed to find user');
    }
  }

  async findById(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch {
      throw errors.internal('Failed to find user');
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userModel.findOne({
        email: email.toLowerCase(),
      });
    } catch {
      throw errors.internal('Failed to find user by email');
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
      throw errors.internal('Failed to find user by email');
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
      throw errors.internal('Failed to update password');
    }
  }
}
