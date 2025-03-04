import { ShortURL } from '../entities/short-url.entity';

export interface IShortURLRepository {
  existsByShortCode(code: string): Promise<boolean>;
  save(shortURL: ShortURL): Promise<void>;
  findByShortCode(code: string): Promise<ShortURL | null>;
}
