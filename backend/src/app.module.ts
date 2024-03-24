import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';

import { LoggerMiddleware } from './common/middleware';
import { ChainlinkModule } from './modules/coins';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/environments/.env`,
      isGlobal: true,
    }),
    ChainlinkModule,
    RouterModule.register([
      {
        path: 'coins',
        children: [
          {
            path: 'chainlink',
            module: ChainlinkModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
