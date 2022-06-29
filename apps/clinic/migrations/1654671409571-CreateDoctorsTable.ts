import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDoctorsTable1654671409571 implements MigrationInterface {
  name = 'CreateDoctorsTable1654671409571';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE clinic.doctors (
        id uuid DEFAULT uuid_generate_v4(), 
        user_id uuid NOT NULL, 
        specialization character varying NOT NULL, 
        created_at timestamp DEFAULT current_timestamp, 
        updated_at timestamp DEFAULT current_timestamp,
        CONSTRAINT PK_doctor_id PRIMARY KEY (id),
        CONSTRAINT UQ_doctor_user_id UNIQUE (user_id)
      );
    `);

    await queryRunner.query(`
      CREATE TRIGGER doctors_update_updated_at BEFORE 
      UPDATE 
        ON clinic.doctors FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE clinic.doctors;`);
    await queryRunner.query(`DROP TRIGGER doctors_update_updated_at;`);
  }
}
