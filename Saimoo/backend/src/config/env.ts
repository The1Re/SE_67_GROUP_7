import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: Number(process.env.PORT) || 3000,
    databaseUrl: process.env.DATABASE_URL || 'mysql://root:1234@localhost:3306/mydb',
    jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
    node_env: process.env.NODE_ENV || 'development',
    mail_host: process.env.MAIL_HOST || 'gmail',
    mail_user: process.env.MAIL_USER || 'user',
    mail_pass: process.env.MAIL_PASSWORD || 'pass',
}

export default config;