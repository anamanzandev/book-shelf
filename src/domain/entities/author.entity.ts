import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Author {
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @Column({ type: "varchar", length: "100" })
    FirstName: string;

    @Column({ type: "varchar", length: "100" })
    LastName: string;

    @Column({ type: "varchar", length: "1000" })
    MiniBio: string;

    @ManyToMany(type => Book)
    @JoinTable()
    Books: Book[];
}