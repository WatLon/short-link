import { Click } from '../entities/click.entity';
import { ShortCodeValueObject } from '../value-objects/short-code.vo';

export interface IClickRepository {
  findByShortUrlCode(code: ShortCodeValueObject): Promise<Click[]>;
  save(click: Click): Promise<void>;
}
