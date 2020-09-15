import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAvailability1599762562894
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'availabilities',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'sunday',
            type: 'boolean',
          },
          {
            name: 'monday',
            type: 'boolean',
          },
          {
            name: 'tuesday',
            type: 'boolean',
          },
          {
            name: 'wednesday',
            type: 'boolean',
          },
          {
            name: 'thursday',
            type: 'boolean',
          },
          {
            name: 'friday',
            type: 'boolean',
          },
          {
            name: 'saturday',
            type: 'boolean',
          },
          {
            name: 'morning',
            type: 'boolean',
          },
          {
            name: 'afternoon',
            type: 'boolean',
          },
          {
            name: 'night',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('availabilities');
  }
}
