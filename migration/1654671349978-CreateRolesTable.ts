import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRolesTable1654671349978 implements MigrationInterface {
  name = 'CreateRolesTable1654671349978';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE roles (
        id uuid DEFAULT uuid_generate_v4(),
        name character varying NOT NULL,
        CONSTRAINT PK_role_id PRIMARY KEY (id)
      );
    `);

    await queryRunner.query(`
      INSERT INTO roles (name)
      VALUES
        ('Patient'),
        ('Doctor');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE roles;`);
  }
}
