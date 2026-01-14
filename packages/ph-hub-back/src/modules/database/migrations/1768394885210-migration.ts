import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1768394885210 implements MigrationInterface {
    name = 'Migration1768394885210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "opponent_types" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "color" character varying NOT NULL, "icon" character varying NOT NULL, "is_default" boolean NOT NULL DEFAULT false, "user_id" integer NOT NULL, CONSTRAINT "PK_2d0e4d603490f50f5634c8c57a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "onboarding_completed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "nickname" character varying`);
        await queryRunner.query(`ALTER TABLE "opponent_types" ADD CONSTRAINT "FK_516531518287e5630d899a3737b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "opponent_types" DROP CONSTRAINT "FK_516531518287e5630d899a3737b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "nickname"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "onboarding_completed"`);
        await queryRunner.query(`DROP TABLE "opponent_types"`);
    }

}
