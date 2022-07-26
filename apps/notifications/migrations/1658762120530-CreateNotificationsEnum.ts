import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotificationsEnum1658762120530
  implements MigrationInterface
{
  name = 'CreateNotificationsEnum1658762120530';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE notifications_type AS ENUM ('appointment', 'resolution');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE notifications_type;`);
  }
}
