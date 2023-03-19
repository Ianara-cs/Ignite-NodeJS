import { container } from 'tsyringe'
import { IDateProvider } from './DateProvider/IDateProvider'
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider'
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider'
import { IStorageProvider } from './StorageProvider/IStorageProvider'


export enum INJECTS {
    DATE_PROVIDER = "DATE_PROVIDER",
    ETHEREAL_MAIL_PRO = "ETHEREAL_MAIL_PROVIDER",
    STORAGE_PROVIDER = "STORAGE_PROVIDER"

}

container.registerSingleton<IDateProvider>(
    INJECTS.DATE_PROVIDER,
    DayjsDateProvider
)

container.registerInstance<IMailProvider>(
    INJECTS.ETHEREAL_MAIL_PRO,
    new EtherealMailProvider()
)

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
    INJECTS.STORAGE_PROVIDER,
    diskStorage[process.env.disk]
)