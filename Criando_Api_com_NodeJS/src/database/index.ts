import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "../modules/cars/entities/Category";


const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "nara",
    database: "ignite_node",
    synchronize: false,
    logging: true,
    entities: [Category],
    migrations: ["./src/**/migrations/*.ts"],
})

export function createConnection(host = "database"): Promise<DataSource> {
    return AppDataSource.setOptions({ host }).initialize();
}
  
export default AppDataSource