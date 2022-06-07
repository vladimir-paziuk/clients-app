import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBloodTypeEnum1653649950002 implements MigrationInterface {
  name = 'CreateBloodTypeEnum1653649950002';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE blood_type AS ENUM ('o', 'a', 'b', 'ab');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`    DROP TYPE blood_type;    `);
  }
}
