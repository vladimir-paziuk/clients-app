import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAppointmentsTable1654785979930
  implements MigrationInterface
{
  name = 'CreateAppointmentsTable1654785979930';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE clinic.appointments (
        id uuid DEFAULT uuid_generate_v4(), 
        patient_id uuid REFERENCES clinic.patients(id),
        doctor_id uuid REFERENCES clinic.doctors(id),
        reason character varying,  
        reservation_date timestamp NOT NULL, 
        created_at timestamp DEFAULT current_timestamp, 
        updated_at timestamp DEFAULT current_timestamp,
        CONSTRAINT PK_appointment_id PRIMARY KEY (id)
      );
    `);

    await queryRunner.query(`
      CREATE TRIGGER appointments_update_updated_at BEFORE 
      UPDATE 
        ON clinic.appointments FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE clinic.appointments;`);
    await queryRunner.query(`DROP TRIGGER appointments_update_updated_at;`);
  }
}

// FOREIGN KEY (patient_id) REFERENCES patients(id),
// FOREIGN KEY (doctor_id) REFERENCES doctors(id)
