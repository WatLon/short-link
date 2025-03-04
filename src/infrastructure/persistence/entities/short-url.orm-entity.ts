import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity('short_urls')
export class ShortURLOrmEntity {
  @PrimaryColumn({ unique: true })
  @Index()
  shortCode: string;

  @Column()
  originalUrl: string;

  @Column()
  createdAt: Date;

  @Column()
  isActive: boolean;

  @Column({ type: 'varchar', nullable: true })
  ownerId: string | null;
}
