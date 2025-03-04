import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { GetURLStatsUseCase } from 'src/application/use-cases/get-url-stats.usecase';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly getURLStatsUseCase: GetURLStatsUseCase) {}

  @Get(':shortUrlCode')
  async getStats(@Param('shortUrlCode') shortUrlId: string) {
    const stats = await this.getURLStatsUseCase.execute(shortUrlId);
    return stats;
  }
}
