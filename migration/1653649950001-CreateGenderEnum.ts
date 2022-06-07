import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGenderEnum1653649950001 implements MigrationInterface {
  name = 'CreateGenderEnum1653649950001';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE gender AS ENUM ('male', 'female');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`    DROP TYPE gender;    `);
  }
}
