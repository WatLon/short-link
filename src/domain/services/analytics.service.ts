import { IClickRepository } from '../interfaces/click.repository.interface';
import { ShortCodeValueObject } from '../value-objects/short-code.vo';

export class AnalyticsService {
  constructor(private readonly clickRepository: IClickRepository) {}

  public async getClickStats(shortUrlCode: string): Promise<any> {
    const clicks = await this.clickRepository.findByShortUrlCode(
      ShortCodeValueObject.create(shortUrlCode),
    );
    return {
      totalClicks: clicks.length,
    };
  }
}
