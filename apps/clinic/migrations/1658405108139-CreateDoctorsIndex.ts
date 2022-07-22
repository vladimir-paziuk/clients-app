import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDoctorsIndex1658405108139 implements MigrationInterface {
  name = 'CreateDoctorsIndex1658405108139';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE INDEX doctors_specialization ON clinic.doctors(specialization);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX doctors_specialization;`);
  }
}
