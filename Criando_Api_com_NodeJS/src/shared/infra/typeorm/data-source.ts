import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { Category } from "../../../modules/cars/infra/typeorm/entities/Category";
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specification";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "nara",
    database: "ignite_node",
    synchronize: false,
    logging: true,
    entities: [Category, Specification, User],
    migrations: [`${__dirname}/**/**/migrations/*.{ts,js}`],
    subscribers: []
})

export function createConnection(host = "database"): Promise<DataSource> {
    return AppDataSource.setOptions({ host }).initialize();
}
  