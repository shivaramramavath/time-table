import { UserRepository } from './user.repository.js';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: any) {
    return await this.userRepository.create(user);
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
