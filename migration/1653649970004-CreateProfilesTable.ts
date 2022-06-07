import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfilesTable1653649970004 implements MigrationInterface {
  name = 'CreateProfilesTable1653649970004';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE profiles (
        id uuid DEFAULT uuid_generate_v4(), 
        user_id uuid REFERENCES users(id), 
        gender gender, 
        first_name character varying, 
        last_name character varying, 
        image character varying DEFAULT 'image.png', 
        created_at timestamp DEFAULT current_timestamp, 
        updated_at timestamp DEFAULT current_timestamp
      );
    `);

    await queryRunner.query(`
      CREATE TRIGGER profiles_update_updated_at BEFORE 
      UPDATE 
        ON profiles FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`    DROP TABLE profiles;    `);
    await queryRunner.query(`    DROP TRIGGER profiles_update_updated_at;    `);
  }
}
