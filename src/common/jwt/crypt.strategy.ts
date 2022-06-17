import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptStrategy {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(pass1: string, pass2: string): Promise<boolean> {
    return await bcrypt.compare(pass1, pass2);
  }
}
