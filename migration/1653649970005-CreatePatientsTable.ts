import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePatientsTable1653649970005 implements MigrationInterface {
  name = 'CreatePatientsTable1653649970005';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE patients
    (
      id uuid DEFAULT uuid_generate_v4(),
      user_id uuid REFERENCES users(id),   
      blood_type blood_type NOT NULL
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`    DROP TABLE patients;    `);
  }
}
