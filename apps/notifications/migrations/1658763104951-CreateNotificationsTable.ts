import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotificationsTable1658763104951
  implements MigrationInterface
{
  name = 'CreateNotificationsTable1658763104951';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE notifications.notifications (
        id uuid DEFAULT uuid_generate_v4(), 
        user_id uuid NOT NULL, 
        type character varying NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        payload JSONB,
        created_at timestamp DEFAULT current_timestamp, 
        updated_at timestamp DEFAULT current_timestamp
      );
    `);

    await queryRunner.query(`
      CREATE TRIGGER notifications_update_updated_at BEFORE 
      UPDATE 
        ON notifications.notifications FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE notifications.notifications;`);
    await queryRunner.query(`DROP TRIGGER notifications_update_updated_at;`);
  }
}
