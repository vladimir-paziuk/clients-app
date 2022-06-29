import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfilesTable1654671389313 implements MigrationInterface {
  name = 'CreateProfilesTable1654671389313';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE profiles.profiles (
        id uuid DEFAULT uuid_generate_v4(), 
        user_id uuid NOT NULL, 
        gender gender, 
        first_name character varying, 
        last_name character varying, 
        image character varying DEFAULT 'image.png', 
        created_at timestamp DEFAULT current_timestamp, 
        updated_at timestamp DEFAULT current_timestamp,
        CONSTRAINT UQ_profile_user_id UNIQUE (user_id)
      );
    `);

    await queryRunner.query(`
      CREATE TRIGGER profiles_update_updated_at BEFORE 
      UPDATE 
        ON profiles.profiles FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE profiles.profiles;`);
    await queryRunner.query(`DROP TRIGGER profiles_update_updated_at;`);
  }
}
