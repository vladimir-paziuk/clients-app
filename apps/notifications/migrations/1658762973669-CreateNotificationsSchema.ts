import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotificationsSchema1658762973669
  implements MigrationInterface
{
  name = 'CreateNotificationsSchema1658762973669';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE SCHEMA IF NOT EXISTS notifications;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP SCHEMA IF EXISTS notifications;
    `);
  }
}
