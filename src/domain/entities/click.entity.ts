import { ShortCodeValueObject } from '../value-objects/short-code.vo';

interface CreateClick {
  id: string;
  shortURLCode: ShortCodeValueObject;
  ipAddress: string | null;
  userAgent: string | null;
}

export class Click {
  constructor(
    private readonly id: string,
    private readonly shortURLCode: ShortCodeValueObject,
    private readonly timestamp: Date,
    private readonly ipAddress: string | null,
    private readonly userAgent: string | null,
  ) {}

  public static create(click: CreateClick): Click {
    return new Click(
      click.id,
      click.shortURLCode,
      new Date(),
      click.ipAddress,
      click.userAgent,
    );
  }

  public getId(): string {
    return this.id;
  }

  public getShortURLCode(): ShortCodeValueObject {
    return this.shortURLCode;
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }

  public getIpAddress(): string | null {
    return this.ipAddress;
  }

  public getUserAgent(): string | null {
    return this.userAgent;
  }
}
