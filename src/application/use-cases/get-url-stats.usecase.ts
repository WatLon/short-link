import { Injectable } from '@nestjs/common';
import { AnalyticsService } from '../../domain/services/analytics.service';

@Injectable()
export class GetURLStatsUseCase {
  constructor(private readonly analyticsService: AnalyticsService) {}

  public async execute(shortUrlId: string): Promise<any> {
    return this.analyticsService.getClickStats(shortUrlId);
  }
}
