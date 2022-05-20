import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return 'Server is running! \n Plesse check http://localhost:3333/api for Swagger docs ...';
  }
}
