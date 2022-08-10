import { inject, injectable } from "tsyringe"
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository"

interface IRequest{
    name: string
    description: string
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationsRepository
    ) {}

    execute({description, name}: IRequest) {
        const specificationAlreadyExists = this.specificationRepository.findByName(name)

        if(specificationAlreadyExists) {
            throw new Error('Specification Already exists!')
        }

        this.specificationRepository.create({description, name})
    }
}

export { CreateSpecificationUseCase }

