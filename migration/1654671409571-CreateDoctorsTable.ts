import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDoctorsTable1654671409571 implements MigrationInterface {
  name = 'CreateDoctorsTable1654671409571';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE doctors (
        id uuid DEFAULT uuid_generate_v4(), 
        user_id uuid REFERENCES users(id), 
        specialization character varying NOT NULL, 
        created_at timestamp DEFAULT current_timestamp, 
        updated_at timestamp DEFAULT current_timestamp,
        CONSTRAINT PK_doctor_id PRIMARY KEY (id)
      );
    `);

    await queryRunner.query(`
      CREATE TRIGGER doctors_update_updated_at BEFORE 
      UPDATE 
        ON doctors FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE doctors;`);
    await queryRunner.query(`DROP TRIGGER doctors_update_updated_at;`);
  }
}
