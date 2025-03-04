export class URLValueObject {
  private constructor(private readonly url: string) {}

  public static create(url: string): URLValueObject {
    if (!URLValueObject.isValidUrl(url)) {
      throw new Error('Invalid URL');
    }
    return new URLValueObject(url);
  }

  private static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  public getValue(): string {
    return this.url;
  }
}
