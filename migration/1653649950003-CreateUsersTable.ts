import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1653649950003 implements MigrationInterface {
  name = 'CreateUsersTable1653649950003';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE users
    (
      id uuid DEFAULT uuid_generate_v4(),
      email character varying NOT NULL,
      password character varying NOT NULL,
      CONSTRAINT PK_user_id PRIMARY KEY (id),
      CONSTRAINT UQ_user_email UNIQUE (email)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`    DROP TABLE users;    `);
  }
}
