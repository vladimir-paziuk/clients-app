import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGenderEnum1654671224445 implements MigrationInterface {
  name = 'CreateGenderEnum1654671224445';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE gender AS ENUM ('male', 'female');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE gender;`);
  }
}
