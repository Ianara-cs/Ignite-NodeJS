import { MigrationInterface, QueryRunner } from "typeorm"

export class RenomearAColunaLincensePlate1672886390780 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn(
            "cars", 
            "lincense_plate",  
            "license_plate"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("cars", "license_plate")
    }

}
