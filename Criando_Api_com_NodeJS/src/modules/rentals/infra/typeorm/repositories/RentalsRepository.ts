import { Repository } from "typeorm";
import { appDataSource } from "../../../../../shared/infra/typeorm/data-source";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>

    constructor() {
        this.repository = appDataSource.getRepository(Rental)
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({where: {car_id}})
        return openByCar
    }

    async findOpenRentalByUser(user_id: any): Promise<Rental> {
        const openByUser = await this.repository.findOne({where: {user_id}})
        return openByUser
    }

    async create({car_id, expected_return_date, user_id}: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id
        })

        await this.repository.save(rental)
        
        return rental
    }

}

export { RentalsRepository };

