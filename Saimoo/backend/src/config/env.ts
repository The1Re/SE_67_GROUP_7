import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: Number(process.env.PORT) || 3000,
    databaseUrl: process.env.DATABASE_URL || 'mysql://root:1234@localhost:3306/mydb',
    jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
    node_env: process.env.NODE_ENV || 'development'
}

export default config;