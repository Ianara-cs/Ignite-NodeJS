import { inject, injectable } from "tsyringe"
import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository"

interface IRequest {
    car_id: string
    images_name: string[]
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImagesRepository: ICarsImagesRepository
    ){}

    async execute({car_id, images_name}: IRequest): Promise<void> {
        images_name.map(async(Image) => {
            await this.carsImagesRepository.create(car_id, Image)
        })
    }
}

export { UploadCarImagesUseCase }

