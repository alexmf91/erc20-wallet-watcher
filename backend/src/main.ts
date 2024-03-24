import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception-filters';
import { setupSwagger } from './config';
import type { EnvironmentVariables } from './config/environments';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService =
      app.get<ConfigService<EnvironmentVariables>>(ConfigService);

    const PORT = configService.get('PORT', { infer: true }) || 3000;
    const VERSION = configService.get('VERSION', { infer: true });

    const { httpAdapter } = app.get(HttpAdapterHost);

    app.setGlobalPrefix(`api/v${VERSION}`);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));

    setupSwagger(app, configService);

    await app.listen(PORT);
    const url = await app.getUrl();

    Logger.verbose(`Application is running on: ${url} ✔️`);
    Logger.verbose(`Api documentation run on: ${url}/api ✔️`);
  } catch (error) {
    Logger.error(`❌❌❌ ${error.message} ❌❌❌`);
  }
}

bootstrap();
