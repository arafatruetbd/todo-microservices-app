import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "uuid", unique: true, default: () => "gen_random_uuid()" })
  uuid!: string;

  @Column()
  content!: string;

  @Column({ type: "uuid" })
  user_uuid!: string;
}
