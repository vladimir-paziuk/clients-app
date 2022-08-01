import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDoctorsIndex1658405108139 implements MigrationInterface {
  name = 'CreateDoctorsIndex1658405108139';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE INDEX doctors_specialization_idx ON clinic.doctors(specialization);
    `);
    await queryRunner.query(`
      CREATE INDEX doctors_created_at_idx ON clinic.doctors(created_at);
    `);
    await queryRunner.query(`
      CREATE INDEX doctors_updated_at_idx ON clinic.doctors(updated_at);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX doctors_specialization_idx;`);
    await queryRunner.query(`DROP INDEX doctors_created_at_idx;`);
    await queryRunner.query(`DROP INDEX doctors_updated_at_idx;`);
  }
}
