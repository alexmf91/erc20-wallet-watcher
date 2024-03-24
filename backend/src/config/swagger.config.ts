import { ConfigService } from '@nestjs/config';
import type { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerModule,
  type SwaggerCustomOptions,
} from '@nestjs/swagger';

import type { EnvironmentVariables } from './environments';

export function setupSwagger(
  app: NestExpressApplication,
  configService: ConfigService<EnvironmentVariables>,
) {
  const APP = configService.get('APP', { infer: true });
  const VERSION = configService.get('VERSION', { infer: true });

  const config = new DocumentBuilder()
    .setTitle(APP)
    .setDescription(`${APP} - API Documentation`)
    .setVersion(VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      filter: true,
      persistAuthorization: true,
      tagsSorter: 'alpha',
    },
  };

  SwaggerModule.setup('api-docs', app, document, customOptions);
}
