import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthenticationMiddleware } from '../authentication/authentication.middleware';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), AuthenticationModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(UserController);
  }
}
