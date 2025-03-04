import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('clicks')
export class ClickOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  shortUrlCode: string;

  @Column()
  timestamp: Date;

  @Column({ type: 'varchar', nullable: true })
  ipAddress: string | null;

  @Column({ type: 'varchar', nullable: true })
  userAgent: string | null;
}
