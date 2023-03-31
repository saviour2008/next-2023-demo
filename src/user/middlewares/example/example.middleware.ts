import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('example middleware');
    console.log(req.headers.authorization);
    const { authorization } = req.headers;
    if (!req.headers.authorization) {
      throw new HttpException('No authorization token', HttpStatus.FORBIDDEN);
    }
    if (authorization !== 'Bearer IamToken') {
      throw new HttpException(
        'Invalid authorization token',
        HttpStatus.FORBIDDEN,
      );
    }
    next();
  }
}
