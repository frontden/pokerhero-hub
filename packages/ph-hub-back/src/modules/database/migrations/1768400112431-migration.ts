import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1768400112431 implements MigrationInterface {
    name = 'Migration1768400112431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hotkey_settings" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "color" character varying NOT NULL, "key" character varying NOT NULL, "keyCode" character varying NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_8a75298bd9277a21ad4bddf7e8c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hotkey_settings" ADD CONSTRAINT "FK_7b7a103d7acd8d5f74496ad0ec6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotkey_settings" DROP CONSTRAINT "FK_7b7a103d7acd8d5f74496ad0ec6"`);
        await queryRunner.query(`DROP TABLE "hotkey_settings"`);
    }

}
