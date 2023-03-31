import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { AnotherMiddleware } from './middlewares/another/another.middleware';
import { ExampleMiddleware } from './middlewares/example/example.middleware';
import { UserService } from './services/user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(ExampleMiddleware).forRoutes('user');
    // consumer.apply(ExampleMiddleware).forRoutes(UserController);
    consumer
      .apply(ExampleMiddleware)
      .forRoutes(
        {
          path: 'user',
          method: RequestMethod.GET,
        },
        {
          path: 'user/:id/:postId',
          method: RequestMethod.GET,
        },
      )
      .apply(AnotherMiddleware)
      .forRoutes(
        {
          path: 'user',
          method: RequestMethod.GET,
        },
        {
          path: 'user/:id/:postId',
          method: RequestMethod.GET,
        },
      );
  }
}
