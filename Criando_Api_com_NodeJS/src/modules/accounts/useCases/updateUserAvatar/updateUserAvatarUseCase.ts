import { inject, injectable } from "tsyringe"
import { IUsersReposotory } from "../../repositories/IUsersRepository"
import { deleteFile } from './../../../../ultils/file'

interface IRequest {
    user_id: string
    avatar_file: string
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersReposotory
    ){}

    async execute ({user_id, avatar_file}: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id)

        if(user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`)
        }
        user.avatar = avatar_file

        await this.usersRepository.create(user)
    }
}

export { UpdateUserAvatarUseCase }

