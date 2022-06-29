import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClinicSchema1654671409570 implements MigrationInterface {
  name = 'CreateClinicSchema1654671409570';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE SCHEMA IF NOT EXISTS clinic;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP SCHEMA IF EXISTS clinic;
    `);
  }
}
