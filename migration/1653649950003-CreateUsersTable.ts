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
      created_at timestamp DEFAULT current_timestamp,
      updated_at timestamp DEFAULT current_timestamp,
      CONSTRAINT PK_user_id PRIMARY KEY (id),
      CONSTRAINT UQ_user_email UNIQUE (email)
    );
    `);

    await queryRunner.query(`
        CREATE TRIGGER users_update_updated_at
            BEFORE UPDATE
            ON users
            FOR EACH ROW
            EXECUTE PROCEDURE trigger_set_timestamp();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`    DROP TABLE users;    `);
    await queryRunner.query(`    DROP TRIGGER users_update_updated_at;    `);
  }
}
