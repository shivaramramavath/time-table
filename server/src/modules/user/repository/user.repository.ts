import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../entities/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByEmailWithPassword(email: string) {
    return await this.userModel
      .findOne({
        email: email.toLowerCase(),
      })
      .select('+password')
      .exec();
  }

  async create(user: Partial<User>) {
    return this.userModel.create(user);
  }

  async update(userId: string, data: Partial<User>) {
    return this.userModel.updateOne({ _id: userId }, { $set: data }).exec();
  }
}
