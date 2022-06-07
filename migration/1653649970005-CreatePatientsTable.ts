import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePatientsTable1653649970005 implements MigrationInterface {
  name = 'CreatePatientsTable1653649970005';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE patients (
        id uuid DEFAULT uuid_generate_v4(), 
        user_id uuid REFERENCES users(id), 
        blood_type blood_type, 
        created_at timestamp DEFAULT current_timestamp, 
        updated_at timestamp DEFAULT current_timestamp
      );
    `);

    await queryRunner.query(`
      CREATE TRIGGER patients_update_updated_at BEFORE 
      UPDATE 
        ON patients FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`    DROP TABLE patients;    `);
    await queryRunner.query(`    DROP TRIGGER patients_update_updated_at;    `);
  }
}
