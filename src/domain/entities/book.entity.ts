import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, RelationId, ManyToMany } from "typeorm";
import { Status } from "./status.entity";
import { Author } from "./author.entity";

@Entity()
export class Book {
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @Column({ type: "varchar", length: "300" })
    Name: string;

    @Column({ type: "date" })
    ReleaseDate: Date;

    @Column({ type: "varchar", length: "30" })
    ISBN: string;

    @JoinColumn({ name: "StatusId", referencedColumnName: "Id" })
    @ManyToOne(type => Status, status => status.Books)
    Status: Status;

    @RelationId((book: Book) => book.Status)
    StatusId: string;

    @ManyToMany(type => Author)
    Authors: Author[];
}