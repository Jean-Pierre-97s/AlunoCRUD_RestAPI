import { Module } from '@nestjs/common';
import { AuthController } from './infra/http/auth.controller';
import { AuthService } from './service/auth.service';
import { UserModule } from '../user/user.module';
import { jwtConstants } from './service/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.EXPIRES_IN }, // data para fins de estudo e desenvolvimento
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
