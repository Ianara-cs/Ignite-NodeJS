import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersReposotory } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string
    password: string
}

interface IResponse{
    user: {
        name: string
        email: string
    }

    token: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor (
        @inject("UsersRepository")
        private usersRepository: IUsersReposotory
    ) {}

    async execute({email, password}: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if(!user) {
            throw new AppError("Email or password incorrect!")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new AppError("Email or password incorrect!")
        }

        const token = sign({}, "0a21d2753a2cd359a50ab53576d43e64", {
            subject: user.id,
            expiresIn: '1d'
        })

        const tokenReturn: IResponse = {
            user: {
                name: user.name,
                email: user.email

            },
            token
        }

        return tokenReturn
    }
}

export { AuthenticateUserUseCase };

