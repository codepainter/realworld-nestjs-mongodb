import { join, resolve } from 'path';

import { MongoDBModule } from '@app/database/mongodb';
import { LoggerModule } from '@app/logger';
import { Environment } from '@app/shared';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV !== Environment.Production
          ? resolve(join(process.cwd(), 'apps/api-service', '.env'))
          : undefined,
    }),
    AppConfigModule,
    LoggerModule.init({
      exclude: ['health'],
    }),
    MongoDBModule,
    UserModule,
  ],
})
export class AppModule {}
