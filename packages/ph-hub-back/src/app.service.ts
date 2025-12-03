import { Injectable } from '@nestjs/common';
import { UserInterface } from '@ph-hub/common';


@Injectable()
export class AppService {
  getHello(): string {
    const user: UserInterface = {
      email: 'backtest@gmail.com',
    };
    return `Hello! ${user.email}`;
  }
}
