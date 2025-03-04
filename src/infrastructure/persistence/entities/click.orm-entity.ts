import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity('clicks')
export class ClickOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  @Index()
  shortUrlCode: string;

  @Column()
  timestamp: Date;

  @Column({ type: 'varchar', nullable: true })
  ipAddress: string | null;

  @Column({ type: 'varchar', nullable: true })
  userAgent: string | null;
}
