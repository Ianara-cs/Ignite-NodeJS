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
        const openByCar = await this.repository.findOne({where: {car_id, end_date: null}})
        return openByCar
    }

    async findOpenRentalByUser(user_id: any): Promise<Rental> {
        const openByUser = await this.repository.findOne({where: {user_id, end_date: null}})
        return openByUser
    }

    async create({car_id, expected_return_date, user_id, id, end_date, total}: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id,
            id,
            end_date,
            total
        })

        await this.repository.save(rental)
        
        return rental
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne({where: {id}})
        return rental
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rental = await this.repository.find({
            where: {user_id},
            relations: ["car"]
        })

        return rental
    }

}

export { RentalsRepository };

