import { DataSource } from "typeorm";
require('dotenv').config();
export const dataSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: `${process.env.DATABASE_HOST}`,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  // timezone: 'Asia/Karachi',
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['dist/**/**/**.entity{.ts,.js}'],
  migrations: ['dist/migrations/**//**/*{.ts,.js}'],
  subscribers: ['dist/subscriber/**//**/*{.ts,.js}'],
});

dataSource.initialize();

