import { Repository } from "typeorm";
import { appDataSource } from "../../../../../shared/infra/typeorm/data-source";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = appDataSource.getRepository(User);
    }

    
    async create({name, email, driver_license, password, avatar, id}: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name, email, driver_license, password, avatar, id
        })
        
        await this.repository.save(user)
    }
    
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({where: {email}})
        return user
    }
    
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({where: {id}})
        return user
    }
}

export { UsersRepository };

