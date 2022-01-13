import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
