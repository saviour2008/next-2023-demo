import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity({ name: 'user_post' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
