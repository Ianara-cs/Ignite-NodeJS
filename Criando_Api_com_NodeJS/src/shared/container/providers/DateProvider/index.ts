import { container } from 'tsyringe'
import { IDateProvider } from './IDateProvider'
import { DayjsDateProvider } from './implementations/DayjsDateProvider'

export enum INJECTS {
    DATE_PROVIDER = "DATE_PROVIDER"
}

container.registerSingleton<IDateProvider>(
    INJECTS.DATE_PROVIDER,
    DayjsDateProvider
)