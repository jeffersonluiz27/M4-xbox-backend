import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return 'Server is running! \n Plesse check <a href="http://localhost:3333/api">Api Documentation</a> for Swagger docs ...';
  }
}
