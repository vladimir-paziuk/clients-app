import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthSchema1654671349977 implements MigrationInterface {
  name = 'CreateAuthSchema1654671349977';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE SCHEMA IF NOT EXISTS auth;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP SCHEMA IF EXISTS auth;
    `);
  }
}
