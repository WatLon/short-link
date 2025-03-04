import { Injectable } from '@nestjs/common';
import { Click } from '../../domain/entities/click.entity';
import { IShortURLRepository } from 'src/domain/interfaces/short-url.repository.interface';
import { IClickRepository } from 'src/domain/interfaces/click.repository.interface';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class RedirectToOriginalURLUseCase {
  constructor(
    private readonly shortUrlRepository: IShortURLRepository,
    private readonly clickRepository: IClickRepository,
  ) {}

  public async execute(
    shortCode: string,
    ipAddress: string | null,
    userAgent: string | null,
  ): Promise<string> {
    const shortUrl = await this.shortUrlRepository.findByShortCode(shortCode);
    if (!shortUrl || !shortUrl.isActive()) {
      throw new Error('Ссылка не найдена или деактивирована');
    }

    const click = Click.create({
      id: this.generateId(),
      shortURLCode: shortUrl.getShortCode(),
      ipAddress,
      userAgent,
    });
    await this.clickRepository.save(click);

    return shortUrl.getOriginalURL().getValue();
  }

  private generateId(): string {
    return uuid4();
  }
}
