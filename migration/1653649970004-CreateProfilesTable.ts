import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfilesTable1653649970004 implements MigrationInterface {
  name = 'CreateProfilesTable1653649970004';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE profiles
    (
      id uuid DEFAULT uuid_generate_v4(),
      user_id uuid REFERENCES users(id),   
      gender gender NOT NULL,
      first_name character varying NOT NULL,
      last_name character varying NOT NULL,
      image character varying DEFAULT 'image.png'
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`    DROP TABLE profiles;    `);
  }
}
