import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvModule } from './env/env.module';
import { envSchema } from './env/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_URI'),
      }),
      inject: [ConfigService],
    }),
    EnvModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
