import { container } from 'tsyringe'
import { IDateProvider } from './DateProvider/IDateProvider'
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'

export enum INJECTS {
    DATE_PROVIDER = "DATE_PROVIDER",
    ETHEREAL_MAIL_PRO = "ETHEREAL_MAIL_PROVIDER",
}

container.registerSingleton<IDateProvider>(
    INJECTS.DATE_PROVIDER,
    DayjsDateProvider
)

container.registerInstance<IMailProvider>(
    INJECTS.ETHEREAL_MAIL_PRO,
    new EtherealMailProvider()
)