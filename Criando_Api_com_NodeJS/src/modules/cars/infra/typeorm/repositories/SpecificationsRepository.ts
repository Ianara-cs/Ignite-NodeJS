import { In, Repository } from "typeorm";
import { appDataSource } from "../../../../../shared/infra/typeorm/data-source";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = appDataSource.getRepository(Specification)
    }

    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            description,
            name
        })

        await this.repository.save(specification)
        return specification
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({
            where: {name}
        })

        return specification
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findBy({ id: In(ids) });
    
        return specifications
    }

}

export { SpecificationsRepository };

