import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDoctorsRecords1654676976927 implements MigrationInterface {
  name = 'InsertDoctorsRecords1654676976927';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO users (email, password) 
      VALUES 
        (
          'pediatricians@gmail.com', '$2b$10$426wAxxxjWcVhM9JJMEnuOfyuPSuszylMO3mpYzxVK6eWX.z.APU2'
        );
      INSERT INTO user_roles (user_id, role_id) WITH
      u AS (
        SELECT 
          id 
        FROM 
          users 
        WHERE 
          email = 'pediatricians@gmail.com'
      ), 
      r AS (
        SELECT 
          id 
        FROM 
          roles 
        WHERE 
          name = 'Doctor'
      ) 
      select 
        u.id, 
        r.id 
      from 
        u, 
        r;
      INSERT INTO profiles (user_id) 
      SELECT 
        u.id 
      FROM 
        users u 
      WHERE 
        u.email = 'pediatricians@gmail.com';
      INSERT INTO doctors (user_id, specialization) 
      SELECT 
        u.id, 
        'Pediatricians' 
      FROM 
        users u 
      WHERE 
        u.email = 'pediatricians@gmail.com';
    `);

    await queryRunner.query(`
      INSERT INTO users (email, password) 
      VALUES 
        (
          'neurologists@gmail.com', '$2b$10$Q1Tf/0teU7cmUfNZn391COB/gUph4KwCwYVRKfrEnshVx4vg3g6pm'
        );
      INSERT INTO user_roles (user_id, role_id) WITH
      u AS (
        SELECT 
          id 
        FROM 
          users 
        WHERE 
          email = 'neurologists@gmail.com'
      ), 
      r AS (
        SELECT 
          id 
        FROM 
          roles 
        WHERE 
          name = 'Doctor'
      ) 
      select 
        u.id, 
        r.id 
      from 
        u, 
        r;
      INSERT INTO profiles (user_id) 
      SELECT 
        u.id 
      FROM 
        users u 
      WHERE 
        u.email = 'neurologists@gmail.com';
      INSERT INTO doctors (user_id, specialization) 
      SELECT 
        u.id, 
        'Neurologists' 
      FROM 
        users u 
      WHERE 
        u.email = 'neurologists@gmail.com';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // TODO: Remove records from 3 tables
    // await queryRunner.query(`DROP TABLE doctors;`);
    // await queryRunner.query(`DROP TRIGGER doctors_update_updated_at;`);
  }
}
