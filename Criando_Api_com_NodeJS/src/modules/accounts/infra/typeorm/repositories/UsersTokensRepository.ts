import { Repository } from "typeorm";
import { appDataSource } from "../../../../../shared/infra/typeorm/data-source";
import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "../../../repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository{
    private repository: Repository<UserTokens>
    constructor() {
        this.repository = appDataSource.getRepository(UserTokens)
    }

    async create({ expires_date: expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            user_id,
            refresh_token
        })

        await this.repository.save(userToken)

        return userToken
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const userTokens = await this.repository.findOne({where: {
            user_id, refresh_token
        }})

        return userTokens
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userTokens = await this.repository.findOne({where: {
            refresh_token
        }})

        return userTokens
    }

}

export { UsersTokensRepository };

