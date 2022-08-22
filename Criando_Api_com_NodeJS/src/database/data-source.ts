import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "nara",
    database: "ignite_node",
    synchronize: false,
    logging: true,
    entities: [Category, Specification],
    migrations: [`${__dirname}/**/**/migrations/*.{ts,js}`],
    subscribers: []
})

export function createConnection(host = "database"): Promise<DataSource> {
    return AppDataSource.setOptions({ host }).initialize();
}
  