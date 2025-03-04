export class ShortCodeValueObject {
  private constructor(private readonly code: string) {}

  public static create(code: string): ShortCodeValueObject {
    if (!ShortCodeValueObject.isValidCode(code)) {
      throw new Error('Некорректный короткий код');
    }
    return new ShortCodeValueObject(code);
  }

  public static generate(): ShortCodeValueObject {
    const code = Math.random().toString(36).substring(2, 8);
    return new ShortCodeValueObject(code);
  }

  private static isValidCode(code: string): boolean {
    const regex = /^[a-zA-Z0-9_-]{6,10}$/;
    return regex.test(code);
  }

  public getValue(): string {
    return this.code;
  }
}
