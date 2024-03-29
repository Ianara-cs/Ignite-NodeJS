import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory


describe ("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)
    })

    it("should be able to add a new specification to the car", async() => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        })
    
        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "test"
        })

        const specifications_id = [specification.id]
        
        const specificationsCar = await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id})
        
        expect(specificationsCar).toHaveProperty("specifications")
        expect(specificationsCar.specifications.length).toBe(1)
    })

    it("should not be able to add a new specification to a now-existent car", async() => {
        const car_id = "1234"
        const specification_id = ["54321"]

        await expect(
            createCarSpecificationUseCase.execute({car_id, specifications_id: specification_id})
        ).rejects.toEqual(new AppError("Car does not exists!"))
    })
})