import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDoctorsTable1653649970006 implements MigrationInterface {
  name = 'CreateDoctorsTable1653649970006';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE doctors
    (
      id uuid DEFAULT uuid_generate_v4(),
      user_id uuid REFERENCES users(id),   
      specialization character varying NOT NULL
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`    DROP TABLE doctors;    `);
  }
}
