import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { RoomModule } from './room/room.module';
import { RootModule } from './root/root.module';
import envConfig from './app/envConfig';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  load: [envConfig],
});
const uri = `${envConfig().DB_URI}/${envConfig().NODE_ENV}${envConfig().DB_OPTIONS}`;
const databaseConfig = MongooseModule.forRoot(uri);

@Module({
  imports: [configModule, databaseConfig, UserModule, AuthenticationModule, RoomModule, RootModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
