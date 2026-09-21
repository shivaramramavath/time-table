import { UserModel } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';

const userRepository = new UserRepository(UserModel);

export const userService = new UserService(userRepository);

export const userController = new UserController(userService);
