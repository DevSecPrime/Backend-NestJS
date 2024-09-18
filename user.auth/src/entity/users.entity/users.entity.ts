import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccessToken } from '../access_token.entity/access_token';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 20 })
  countryCode: string;

  @Column({ length: 20 })
  phoneNo: string;

  @Column({ length: 255 })
  password: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // One-to-many relationship with AccessToken
  @OneToMany(() => AccessToken, (accessToken) => accessToken.user)
  accessTokens: AccessToken[];
}
