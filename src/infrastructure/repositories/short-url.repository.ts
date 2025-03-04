import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortURLOrmEntity } from '../persistence/entities/short-url.orm-entity';
import { ShortURL } from '../../domain/entities/short-url.entity';
import { ShortCodeValueObject } from '../../domain/value-objects/short-code.vo';
import { URLValueObject } from '../../domain/value-objects/url.vo';
import { IShortURLRepository } from 'src/domain/interfaces/short-url.repository.interface';

@Injectable()
export class ShortURLRepository implements IShortURLRepository {
  constructor(
    @InjectRepository(ShortURLOrmEntity)
    private readonly ormRepo: Repository<ShortURLOrmEntity>,
  ) {}

  private toDomain(entity: ShortURLOrmEntity): ShortURL {
    return new ShortURL(
      ShortCodeValueObject.create(entity.shortCode),
      URLValueObject.create(entity.originalUrl),
      entity.createdAt,
      entity.isActive,
      entity.ownerId,
    );
  }

  private toOrmEntity(domain: ShortURL): ShortURLOrmEntity {
    return {
      shortCode: domain.getShortCode().getValue(),
      originalUrl: domain.getOriginalURL().getValue(),
      createdAt: domain.getCreatedAt(),
      isActive: domain.isActive(),
      ownerId: domain.getOwnerId(),
    };
  }

  public async save(shortUrl: ShortURL): Promise<void> {
    const entity = this.toOrmEntity(shortUrl);
    await this.ormRepo.save(entity);
  }

  public async findByShortCode(shortCode: string): Promise<ShortURL | null> {
    const entity = await this.ormRepo.findOne({ where: { shortCode } });
    return entity ? this.toDomain(entity) : null;
  }

  public async existsByShortCode(shortCode: string): Promise<boolean> {
    const count = await this.ormRepo.count({ where: { shortCode } });
    return count > 0;
  }

  public async findByCode(
    shortCode: ShortCodeValueObject,
  ): Promise<ShortURL | null> {
    const entity = await this.ormRepo.findOne({
      where: { shortCode: shortCode.getValue() },
    });
    return entity ? this.toDomain(entity) : null;
  }
}
