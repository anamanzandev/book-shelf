import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1612143721567 implements MigrationInterface {
    name = 'initialMigration1612143721567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "status" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_b3104aac21a05e03998782a75cc" DEFAULT NEWSEQUENTIALID(), "Name" varchar(50) NOT NULL, CONSTRAINT "PK_b3104aac21a05e03998782a75cc" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_2f5c3a233c33616f031206e11bd" DEFAULT NEWSEQUENTIALID(), "Name" varchar(300) NOT NULL, "ReleaseDate" date NOT NULL, "ISBN" varchar(30) NOT NULL, "StatusId" uniqueidentifier, CONSTRAINT "PK_2f5c3a233c33616f031206e11bd" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "author" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_4880e15dfecd31265d230d460a2" DEFAULT NEWSEQUENTIALID(), "FirstName" varchar(100) NOT NULL, "LastName" varchar(100) NOT NULL, "MiniBio" varchar(1000) NOT NULL, CONSTRAINT "PK_4880e15dfecd31265d230d460a2" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "author__books_book" ("authorId" uniqueidentifier NOT NULL, "bookId" uniqueidentifier NOT NULL, CONSTRAINT "PK_5599bc45c5695b4d9da7422f81d" PRIMARY KEY ("authorId", "bookId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f0b57064bdd62a9d13c34e0768" ON "author__books_book" ("authorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2e6306a37c1207efeabaec960d" ON "author__books_book" ("bookId") `);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_86a5f592914d5d64b8ae23b2a9e" FOREIGN KEY ("StatusId") REFERENCES "status"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "author__books_book" ADD CONSTRAINT "FK_f0b57064bdd62a9d13c34e07683" FOREIGN KEY ("authorId") REFERENCES "author"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "author__books_book" ADD CONSTRAINT "FK_2e6306a37c1207efeabaec960de" FOREIGN KEY ("bookId") REFERENCES "book"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author__books_book" DROP CONSTRAINT "FK_2e6306a37c1207efeabaec960de"`);
        await queryRunner.query(`ALTER TABLE "author__books_book" DROP CONSTRAINT "FK_f0b57064bdd62a9d13c34e07683"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_86a5f592914d5d64b8ae23b2a9e"`);
        await queryRunner.query(`DROP INDEX "IDX_2e6306a37c1207efeabaec960d" ON "author__books_book"`);
        await queryRunner.query(`DROP INDEX "IDX_f0b57064bdd62a9d13c34e0768" ON "author__books_book"`);
        await queryRunner.query(`DROP TABLE "author__books_book"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "status"`);
    }

}
