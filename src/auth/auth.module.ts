import { JwtStrategy } from './jwt-strategy';
import { UsersService } from './../users/users.service';
import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
      secret: 'hide-me',
    }),
  ],
  providers: [
    UsersService,
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
