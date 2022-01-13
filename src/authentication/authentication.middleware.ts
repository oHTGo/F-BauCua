import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { UserService } from '../user/user.service';
import { ICurrentUser } from '../app/interfaces/ICurrentUser.interface';
import { User } from '../user/schemas/user.schema';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly authenticationService: AuthenticationService, private readonly userService: UserService) {}
  async use(req: any, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (!authorization) throw new UnauthorizedException('Invalid access permission');

    let type: string;
    let token: string;
    try {
      type = authorization.split(' ')[0];
      token = authorization.split(' ')[1];
    } catch (error) {
      return false;
    }
    if (type !== 'Bearer') throw new UnauthorizedException('Invalid access permission');

    const payload = await this.authenticationService.verifyToken(token);
    if (!payload) throw new UnauthorizedException('Invalid access permission');

    const { email, name } = payload;
    if (!email.includes('@fpt.edu.vn')) throw new UnauthorizedException('Invalid email');

    const user = await this.userService.findByEmail(email);
    let currentUser: ICurrentUser;
    if (user) {
      if (user.disabled) throw new ForbiddenException('User is disabled');

      currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    } else {
      const newUser = new User();
      newUser.name = name;
      newUser.email = email;
      await this.userService.create(newUser);

      const userDB = await this.userService.findByEmail(email);
      currentUser = {
        id: userDB.id,
        name: userDB.name,
        email: userDB.email,
        role: userDB.role,
      };
    }

    req.user = currentUser;
    next();
  }
}
