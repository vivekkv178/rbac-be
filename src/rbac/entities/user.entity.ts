import { Entity, Column, ObjectIdColumn, ObjectId } from "typeorm";

@Entity("users")
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  access_role: string;

  @Column()
  is_registered: boolean;
}
