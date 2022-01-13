import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomGateway } from './room.gateway';
import { RoomController } from './room.controller';
import { Room, RoomSchema } from './schemas/room.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationMiddleware } from '../authentication/authentication.middleware';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]), UserModule, AuthenticationModule],
  providers: [RoomGateway, RoomService],
  controllers: [RoomController],
})
export class RoomModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(RoomController);
  }
}
