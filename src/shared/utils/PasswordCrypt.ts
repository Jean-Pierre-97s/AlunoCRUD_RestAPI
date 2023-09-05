import { hash } from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

export class PasswordCrypt {
  public static async encode(password: string): Promise<string> {
    const hashedPassword = await hash(
      password,
      Number(process.env.BCRYPT_ROUND),
    );

    return hashedPassword;
  }
}
