import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfilesSchema1654671389311 implements MigrationInterface {
  name = 'CreateProfilesSchema1654671389311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE SCHEMA IF NOT EXISTS profiles;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP SCHEMA IF EXISTS profiles;
    `);
  }
}
