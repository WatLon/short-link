import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetURLStatsUseCase } from 'src/application/use-cases/get-url-stats.usecase';
import { ClickRepositoryToken } from 'src/config/constants';
import { IClickRepository } from 'src/domain/interfaces/click.repository.interface';
import { AnalyticsService } from 'src/domain/services/analytics.service';
import { ClickOrmEntity } from 'src/infrastructure/persistence/entities/click.orm-entity';
import { ClickRepository } from 'src/infrastructure/repositories/click.repository';
import { AnalyticsController } from 'src/presentation/controllers/analytics.controller';

const ClickRepositoryProvider: Provider = {
  provide: ClickRepositoryToken,
  useClass: ClickRepository,
};

@Module({
  imports: [TypeOrmModule.forFeature([ClickOrmEntity])],
  controllers: [AnalyticsController],
  providers: [
    {
      provide: AnalyticsService,
      useFactory: (clickRepository: IClickRepository) => {
        return new AnalyticsService(clickRepository);
      },
      inject: [ClickRepositoryToken],
    },
    {
      provide: GetURLStatsUseCase,
      useFactory: (analyticsService: AnalyticsService) => {
        return new GetURLStatsUseCase(analyticsService);
      },
      inject: [AnalyticsService],
    },
    ClickRepositoryProvider,
  ],
  exports: [ClickRepositoryProvider],
})
export class AnalyticsModule {}
