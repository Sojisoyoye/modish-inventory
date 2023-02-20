"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
exports.config = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || "sojisoyoye",
    password: process.env.POSTGRES_PASSWORD || "",
    database: process.env.POSTGRES_DB || "postgres",
    entities: [entities_1.User, entities_1.Product, entities_1.Sale],
    synchronize: true,
});
