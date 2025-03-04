import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClickOrmEntity } from '../persistence/entities/click.orm-entity';
import { Click } from '../../domain/entities/click.entity';
import { IClickRepository } from 'src/domain/interfaces/click.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortCodeValueObject } from 'src/domain/value-objects/short-code.vo';

@Injectable()
export class ClickRepository implements IClickRepository {
  constructor(
    @InjectRepository(ClickOrmEntity)
    private readonly ormRepo: Repository<ClickOrmEntity>,
  ) {}

  private toDomain(entity: ClickOrmEntity): Click {
    return new Click(
      entity.id,
      ShortCodeValueObject.create(entity.shortUrlCode),
      entity.timestamp,
      entity.ipAddress,
      entity.userAgent,
    );
  }

  private toOrmEntity(domain: Click): ClickOrmEntity {
    return {
      id: domain.getId(),
      shortUrlCode: domain.getShortURLCode().getValue(),
      timestamp: domain.getTimestamp(),
      ipAddress: domain.getIpAddress(),
      userAgent: domain.getUserAgent(),
    };
  }

  public async save(click: Click): Promise<void> {
    const entity = this.toOrmEntity(click);
    await this.ormRepo.save(entity);
  }

  public async findByShortUrlCode(
    shortUrlCode: ShortCodeValueObject,
  ): Promise<Click[]> {
    const entities = await this.ormRepo.find({
      where: { shortUrlCode: shortUrlCode.getValue() },
    });
    return entities.map((entity) => this.toDomain(entity));
  }
}
