import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1765894130663 implements MigrationInterface {
    name = 'Migration1765894130663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "google_id" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_0bd5012aeb82628e07f6a1be53b" UNIQUE ("google_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_5230070094e8135a3d763d90e75" UNIQUE ("refresh_token")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "device_fingerprint" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "token_expires_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "token_expires_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "device_fingerprint"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_5230070094e8135a3d763d90e75"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_0bd5012aeb82628e07f6a1be53b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_id"`);
    }

}
