import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSetTimestampFunc1658762896824 implements MigrationInterface {
  name = 'CreateSetTimestampFunc1658762896824';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE 
      OR REPLACE FUNCTION trigger_set_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now();
      RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP FUNCTION trigger_set_timestamp;`);
  }
}
