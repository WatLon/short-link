import { ShortCodeValueObject } from '../value-objects/short-code.vo';
import { URLValueObject } from '../value-objects/url.vo';

interface CreateShortURL {
  shortCode: ShortCodeValueObject;
  originalURL: URLValueObject;
  ownerId: string | null;
}

export class ShortURL {
  constructor(
    private readonly shortCode: ShortCodeValueObject,
    private readonly originalURL: URLValueObject,
    private readonly createdAt: Date,
    private isActiveFlag: boolean,
    private readonly ownerId: string | null,
  ) {}

  public static create(shorturl: CreateShortURL): ShortURL {
    return new ShortURL(
      shorturl.shortCode,
      shorturl.originalURL,
      new Date(),
      true,
      shorturl.ownerId,
    );
  }

  public getShortCode(): ShortCodeValueObject {
    return this.shortCode;
  }

  public getOriginalURL(): URLValueObject {
    return this.originalURL;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getOwnerId(): string | null {
    return this.ownerId;
  }

  public isActive(): boolean {
    return this.isActiveFlag;
  }

  public activate(): void {
    this.isActiveFlag = true;
  }

  public deactivate(): void {
    this.isActiveFlag = false;
  }
}
