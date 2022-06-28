import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRolesTable1654671374619 implements MigrationInterface {
  name = 'CreateUserRolesTable1654671374619';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE auth.user_roles (
        user_id uuid REFERENCES auth.users(id),
        role_id uuid REFERENCES auth.roles(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE auth.user_roles;`);
  }
}
