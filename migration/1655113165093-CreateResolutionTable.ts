import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateResolutionTable1655113165093 implements MigrationInterface {
  name = 'CreateResolutionTable1655113165093';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE resolutions (
        id uuid DEFAULT uuid_generate_v4(), 
        patient_id uuid REFERENCES patients(id),
        doctor_id uuid REFERENCES doctors(id),
        appointment_id uuid REFERENCES appointments(id),
        summary character varying,   
        created_at timestamp DEFAULT current_timestamp, 
        updated_at timestamp DEFAULT current_timestamp
      );
    `);

    await queryRunner.query(`
      CREATE TRIGGER resolutions_update_updated_at BEFORE 
      UPDATE 
        ON patients FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE resolutions;`);
    await queryRunner.query(`DROP TRIGGER resolutions_update_updated_at;`);
  }
}
