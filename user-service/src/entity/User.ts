import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// Defines the User entity representing a user table in the database
@Entity()
export class User {
  // Primary key column with auto-incremented integer ID
  @PrimaryGeneratedColumn()
  id!: number;

  // UUID column that is unique and automatically generated using gen_random_uuid() in the database
  @Column({ type: "uuid", unique: true, default: () => "gen_random_uuid()" })
  uuid!: string;

  // Unique column for storing the user's email address
  @Column({ unique: true })
  user_email!: string;

  // Column for storing the user's hashed password
  @Column()
  user_pwd!: string;
}
