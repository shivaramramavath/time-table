import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import { UserService } from './user.service.js';

export class UserController {
  constructor(private readonly userService: UserService) {}

  me = expressAsyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.findById(req.userId as string);

    res.status(200).json({
      success: true,
      user,
    });
  });

  update = expressAsyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    const user = await this.userService.update(req.userId as string, req.body);

    res.status(200).json({
      success: true,
      user,
    });
  });
}
