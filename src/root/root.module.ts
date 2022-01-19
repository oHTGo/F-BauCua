import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthenticationMiddleware } from '../authentication/authentication.middleware';
import { AuthenticationModule } from '../authentication/authentication.module';
import { RoomModule } from '../room/room.module';
import { UserModule } from '../user/user.module';
import { RootController } from './root.controller';

@Module({
  imports: [UserModule, AuthenticationModule, RoomModule],
  controllers: [RootController],
})
export class RootModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(RootController);
  }
}
