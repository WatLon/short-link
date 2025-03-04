import { Module } from '@nestjs/common';
import { ShortURLModule } from './modules/short-url.module';
import { AnalyticsModule } from './modules/analytics.module';
import { DatabaseModule } from './modules/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ShortURLModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
