import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/service/user.service';
import { PasswordCrypt } from 'src/shared/utils/PasswordCrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new ForbiddenException('E-mail ou senha incorretos');
    const passwordMatches = await PasswordCrypt.compare(pass, user.password);
    if (!passwordMatches)
      throw new ForbiddenException('E-mail ou senha incorretos');

    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
