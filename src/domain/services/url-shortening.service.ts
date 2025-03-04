import { ShortURL } from '../entities/short-url.entity';
import { URLValueObject } from '../value-objects/url.vo';
import { ShortCodeValueObject } from '../value-objects/short-code.vo';
import { IShortURLRepository } from '../interfaces/short-url.repository.interface';
import { v4 as uuid4 } from 'uuid';

interface CreateShortURL {
  originalURL: URLValueObject;
  desiredCode: string | null;
  ownerId: string | null;
}

export class URLShorteningService {
  constructor(private readonly shortUrlRepository: IShortURLRepository) {}

  public async createShortURL(params: CreateShortURL): Promise<ShortURL> {
    const { desiredCode, originalURL, ownerId } = params;

    let shortCode: ShortCodeValueObject;

    if (desiredCode) {
      shortCode = ShortCodeValueObject.create(desiredCode);
      const exists = await this.shortUrlRepository.existsByShortCode(
        shortCode.getValue(),
      );
      if (exists) {
        throw new Error('Короткий код уже используется');
      }
    } else {
      shortCode = await this.generateUniqueShortCode();
    }

    const id = this.generateId();
    return ShortURL.create({ shortCode, originalURL, ownerId });
  }

  private async generateUniqueShortCode(): Promise<ShortCodeValueObject> {
    let shortCode: ShortCodeValueObject;
    let exists: boolean;

    do {
      shortCode = ShortCodeValueObject.generate();
      exists = await this.shortUrlRepository.existsByShortCode(
        shortCode.getValue(),
      );
    } while (exists);

    return shortCode;
  }

  private generateId(): string {
    return uuid4();
  }
}
