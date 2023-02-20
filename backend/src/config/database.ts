import { DataSource } from "typeorm";
import { Product, Sale, User } from "../entities";

export const config = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "sojisoyoye",
  password: process.env.POSTGRES_PASSWORD || "",
  database: process.env.POSTGRES_DB || "postgres",
  entities: [User, Product, Sale],
  synchronize: true,
});
