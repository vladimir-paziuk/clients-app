import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRolesTable1654671374619 implements MigrationInterface {
  name = 'CreateUserRolesTable1654671374619';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE user_roles (
        user_id uuid REFERENCES users(id),
        role_id uuid REFERENCES roles(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user_roles;`);
  }
}
