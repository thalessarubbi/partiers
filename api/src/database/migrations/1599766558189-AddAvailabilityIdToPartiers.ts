import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddAvailabilityIdToPartiers1599766558189
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'partiers',
      new TableColumn({
        name: 'availability_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'partiers',
      new TableForeignKey({
        name: 'PartierAvailability',
        columnNames: ['availability_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'availabilities',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('partiers', 'PartierAvailability');

    await queryRunner.dropColumn('partiers', 'availability_id');
  }
}
