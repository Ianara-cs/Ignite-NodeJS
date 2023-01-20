import { Repository } from "typeorm";
import { appDataSource } from "../../../../../shared/infra/typeorm/data-source";
import { ICarsImagesRepository } from "../../../repositories/ICarsImagesRepository";
import { CarImage } from "../entities/CarImage";

class CarsImagesRepository implements ICarsImagesRepository {
    private repository: Repository<CarImage>

    constructor() {
        this.repository = appDataSource.getRepository(CarImage)
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {
        
        const carImage = this.repository.create({
            car_id,
            image_name
        })

        await this.repository.save(carImage)

        return carImage
    }

}

export { CarsImagesRepository };

