import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { AppError } from "../../../../shared/errors/AppError"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider
        )
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

    it("should be able to authenticate an user", async() => {
        const user: ICreateUserDTO = {
            driver_license: '000123',
            email: 'user@test.com',
            password: '1234',
            name: 'User Test'
        }

        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty('token')
    })

    it("should not be able to authenticate an no existent user", async() => {
        await expect(authenticateUserUseCase.execute({
                email: 'falso@email.com',
                password: '1234'
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"))
    })

    it("should not be able to authenticate with incorrect password", async() => {
        const user: ICreateUserDTO = {
            driver_license: '99999',
            email: 'user@email.com',
            password: '1234',
            name: 'User Test Error'
        }

        await createUserUseCase.execute(user)
        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectPassword'
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"))
    })
})