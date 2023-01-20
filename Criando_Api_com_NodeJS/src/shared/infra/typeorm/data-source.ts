import dotenv from 'dotenv';
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { Car } from "../../../modules/cars/infra/typeorm/entities/Car";
import { Category } from "../../../modules/cars/infra/typeorm/entities/Category";
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "../../../modules/rentals/infra/typeorm/entities/Rental";
dotenv.config();

const localOrmConfig: DataSourceOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: true,
    entities: [Category, Specification, User, Car, Rental],
    migrations: [`${__dirname}/**/**/migrations/*.{ts,js}`],
    subscribers: [],
}

export const appDataSource = new DataSource(localOrmConfig)

export function createConnection(): Promise<DataSource> {
    appDataSource.setOptions({
        database: process.env.NODE_ENV === "test" ? process.env.POSTGRES_DB_TEST: process.env.POSTGRES_DB
        //host: process.env.NODE_ENV === "test" ? "localhost": "",
    })
    return appDataSource.initialize();
}
  