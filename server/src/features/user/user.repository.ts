import { User, UserModel } from './user.model.js';
import { BaseRepository } from '#shared/Base/BaseRepository.js';

export class UserRepository extends BaseRepository<User> {
  constructor(private readonly userModel: typeof UserModel) {
    super(userModel);
  }

  async exists(filter: object): Promise<boolean> {
    const user = await this.userModel.exists(filter);

    return user !== null;
  }

  async findByEmail(email: string) {
    return await this.findOne({ email: email.toLowerCase() });
  }

  async findByEmailWithPassword(email: string) {
    return await this.userModel
      .findOne({
        email: email.toLowerCase(),
      })
      .select('+password');
  }
}

export const userRepository = new UserRepository(UserModel);
