import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // eager: true, dimaksudkan untuk mendapatkan task juga saat user di panggil, sedangkan jika false tidak
  @OneToMany(_type => Task, task => task.user, { eager: true })
  tasks: Task[];
}
