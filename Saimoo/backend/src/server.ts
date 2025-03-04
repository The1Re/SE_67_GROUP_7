import app from './app';
import { env } from './config';
import prisma from './models/prisma';
import logger from './utils/logger';

prisma.$connect()
    .then(() => {
        app.listen(env.port, () => {
            logger.info(`🚀Server is running on http://localhost:${env.port}`);
        });
    })
    .catch((error: any) => {
        logger.error(error);
    });