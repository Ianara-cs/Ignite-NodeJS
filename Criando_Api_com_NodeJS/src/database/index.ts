import "reflect-metadata";
import { DataSource } from "typeorm";


const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "nara",
    database: "ignite_node",
    synchronize: false,
    logging: false,
    migrations: ["./src/**/migrations/*.ts"],
    entities: ["./src/modules/**/entities/*.ts"],
    subscribers: [],
})

export function createConnection(host = "database"): Promise<DataSource> {
    return AppDataSource.setOptions({ host }).initialize();
  }
  
export default AppDataSource