import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateShortURLUseCase } from 'src/application/use-cases/create-short-url.use-case';
import { RedirectToOriginalURLUseCase } from 'src/application/use-cases/redirect-to-original-url.usecase';
import {
  ClickRepositoryToken,
  ShortURLRepositoryToken,
} from 'src/config/constants';
import { IShortURLRepository } from 'src/domain/interfaces/short-url.repository.interface';
import { URLShorteningService } from 'src/domain/services/url-shortening.service';
import { ShortURLOrmEntity } from 'src/infrastructure/persistence/entities/short-url.orm-entity';
import { ShortURLRepository } from 'src/infrastructure/repositories/short-url.repository';
import { ShortURLController } from 'src/presentation/controllers/short-url.controller';
import { AnalyticsModule } from './analytics.module';
import { IClickRepository } from 'src/domain/interfaces/click.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ShortURLOrmEntity]), AnalyticsModule],
  controllers: [ShortURLController],
  providers: [
    {
      provide: ShortURLRepositoryToken,
      useClass: ShortURLRepository,
    },
    {
      provide: URLShorteningService,
      useFactory: (shortURLRepository: ShortURLRepository) => {
        return new URLShorteningService(shortURLRepository);
      },
      inject: [ShortURLRepositoryToken],
    },
    {
      provide: CreateShortURLUseCase,
      useFactory: (
        shortURLRepository: IShortURLRepository,
        urlShorteningService: URLShorteningService,
      ) => {
        return new CreateShortURLUseCase(
          shortURLRepository,
          urlShorteningService,
        );
      },
      inject: [ShortURLRepositoryToken, URLShorteningService],
    },
    {
      provide: RedirectToOriginalURLUseCase,
      useFactory: (
        shortURLRepository: IShortURLRepository,
        clickRepository: IClickRepository,
      ) => {
        return new RedirectToOriginalURLUseCase(
          shortURLRepository,
          clickRepository,
        );
      },
      inject: [ShortURLRepositoryToken, ClickRepositoryToken],
    },
  ],
})
export class ShortURLModule {}
