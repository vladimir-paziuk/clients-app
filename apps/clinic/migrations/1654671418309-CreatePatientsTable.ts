import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePatientsTable1654671418309 implements MigrationInterface {
  name = 'CreatePatientsTable1654671418309';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE clinic.patients (
        id uuid DEFAULT uuid_generate_v4(), 
        user_id uuid NOT NULL, 
        blood_type blood_type, 
        created_at timestamp DEFAULT current_timestamp, 
        updated_at timestamp DEFAULT current_timestamp,
        CONSTRAINT PK_patient_id PRIMARY KEY (id),
        CONSTRAINT UQ_patient_user_id UNIQUE (user_id)
      );
    `);

    await queryRunner.query(`
      CREATE TRIGGER patients_update_updated_at BEFORE 
      UPDATE 
        ON clinic.patients FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE clinic.patients;`);
    await queryRunner.query(`DROP TRIGGER patients_update_updated_at;`);
  }
}
