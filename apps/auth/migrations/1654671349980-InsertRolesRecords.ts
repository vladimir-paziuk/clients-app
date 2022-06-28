import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertRolesRecords1654671349980 implements MigrationInterface {
  name = 'InsertRolesRecords1654671349980';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO auth.roles (name)
      VALUES
        ('Patient'),
        ('Doctor');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM auth.roles
        WHERE name IN ('Patient', 'Doctor')
    `);
  }
}
