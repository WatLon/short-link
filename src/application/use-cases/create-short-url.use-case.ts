import { IShortURLRepository } from 'src/domain/interfaces/short-url.repository.interface';
import { URLShorteningService } from 'src/domain/services/url-shortening.service';
import { URLValueObject } from 'src/domain/value-objects/url.vo';

export class CreateShortURLUseCase {
  constructor(
    private readonly shortURLRepository: IShortURLRepository,
    private readonly urlShorteningService: URLShorteningService,
  ) {}

  public async execute(
    originalURLString: string,
    desiredCode: string | null,
    ownerId: string | null,
  ) {
    const originalURL = URLValueObject.create(originalURLString);

    const shortURL = await this.urlShorteningService.createShortURL({
      originalURL,
      desiredCode,
      ownerId,
    });

    await this.shortURLRepository.save(shortURL);

    return shortURL.getShortCode().getValue();
  }
}
