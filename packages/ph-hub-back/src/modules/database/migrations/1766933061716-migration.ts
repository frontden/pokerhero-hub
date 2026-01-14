import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1766933061716 implements MigrationInterface {
    name = 'Migration1766933061716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_preferences" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "game_type" character varying, "spin_type" character varying, "limits" text array, "poker_rooms" text array, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_458057fa75b66e68a275647da2e" UNIQUE ("user_id"), CONSTRAINT "REL_458057fa75b66e68a275647da2" UNIQUE ("user_id"), CONSTRAINT "PK_e8cfb5b31af61cd363a6b6d7c25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "game_type"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "spin_type"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "limits"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "poker_rooms"`);
        await queryRunner.query(`ALTER TABLE "user_preferences" ADD CONSTRAINT "FK_458057fa75b66e68a275647da2e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_preferences" DROP CONSTRAINT "FK_458057fa75b66e68a275647da2e"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "poker_rooms" text array`);
        await queryRunner.query(`ALTER TABLE "users" ADD "limits" text array`);
        await queryRunner.query(`ALTER TABLE "users" ADD "spin_type" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "game_type" character varying`);
        await queryRunner.query(`DROP TABLE "user_preferences"`);
    }

}
