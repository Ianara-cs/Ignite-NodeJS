import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository"

interface IRequest{
    name: string
    description: string
}

class CreateSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationsRepository) {}

    execute({description, name}: IRequest) {
        const specificationAlreadyExists = this.specificationRepository.findByName(name)

        if(specificationAlreadyExists) {
            throw new Error('Specification Already exists!')
        }

        this.specificationRepository.create({description, name})
    }
}

export { CreateSpecificationUseCase }

