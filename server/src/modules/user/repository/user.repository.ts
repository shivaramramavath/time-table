import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../../../shared/database/repositories/base.repository';
import { User, UserDocument } from '../entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
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

  async updatePassword(userId: string, password: string) {
    return this.userModel
      .updateOne({ _id: userId }, { $set: { password } })
      .exec();
  }
}
