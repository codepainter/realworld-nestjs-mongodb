import helmet from 'helmet';
import { Logger as PinoLogger } from 'nestjs-pino';

import { ClassValidatorExceptionFactory } from '@app/shared/class-validator/class-validator.exception-factory';
import { HttpExceptionFilter } from '@app/shared/filters/http-exception.filter';
import { ValidationExceptionFilter } from '@app/shared/filters/validation-exception.filter';
import { ResponseInterceptor } from '@app/shared/http/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get<PinoLogger>(PinoLogger);
  app.useLogger(logger);

  const appConfig = app.get(AppConfigService);

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
      exceptionFactory: ClassValidatorExceptionFactory,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ValidationExceptionFilter(),
  );

  await app.listen(appConfig.port).then(() => {
    logger.log(
      `[${appConfig.env}] API Service is listening on port: ${appConfig.port}`,
    );
  });
}
bootstrap();
