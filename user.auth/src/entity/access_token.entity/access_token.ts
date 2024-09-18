import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Auth } from '../users.entity/users.entity';
@Entity()
export class AccessToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Auth, (auth) => auth.accessTokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Auth;

  @Column({
    type: 'boolean', // Corrected syntax here
    default: false, // No need for arrow function in boolean
  })
  isRevoked: boolean;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  expiresAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
