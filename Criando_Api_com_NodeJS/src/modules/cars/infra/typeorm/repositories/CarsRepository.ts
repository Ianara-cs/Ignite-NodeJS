import { Repository } from "typeorm";
import { appDataSource } from "../../../../../shared/infra/typeorm/data-source";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>

    constructor() {
        this.repository = appDataSource.getRepository(Car)
    }

    async create({
        name, 
        description, 
        brand, 
        category_id, 
        daily_rate, 
        fine_amount, 
        license_plate,
        specifications,
        id
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name, 
            daily_rate, 
            description, 
            brand, 
            category_id, 
            fine_amount, 
            license_plate,
            specifications,
            id
        })
        
        await this.repository.save(car)
        
        return car
    }
    
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            where: {license_plate}
        })

        return car
    }

        
    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuery = await this.repository
        .createQueryBuilder("c")
        .where("available = :available", {available: true})

        if(brand) {
            carsQuery.andWhere("c.brand = :brand", {brand})
        }
        
        if(category_id) {
            carsQuery.andWhere("c.category_id = :category_id", {category_id})
        } 

        if(name) {
            carsQuery.andWhere("c.name = :name", {name})
        }

        const cars = await carsQuery.getMany()
        return cars
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne({where: {id}})

        return car
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
        .createQueryBuilder()
        .update()
        .set({available})
        .where("id = :id")
        .setParameters({id})
        .execute()
    }

}

export { CarsRepository };

