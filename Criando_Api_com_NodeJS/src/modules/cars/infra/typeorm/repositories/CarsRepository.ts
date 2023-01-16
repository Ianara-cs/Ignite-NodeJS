import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>

    constructor() {
        this.repository = AppDataSource.getRepository(Car)
    }

    async create({name, description, brand, category_id, daily_rate, fine_amount, license_plate}: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({name, daily_rate, description, brand, category_id, fine_amount, license_plate})
        
        await this.repository.save(car)
        
        return car
    }
    
    async findByLincensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            where: {license_plate}
        })

        return car
    }

}

export { CarsRepository };

