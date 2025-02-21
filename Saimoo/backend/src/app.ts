import express from 'express';
import cors from 'cors';
import routes from './routes';
import morgan from 'morgan';
import { env } from './config';

const app = express();

app.use(cors({ origin: '*' }));

if (env.node_env === 'development') {
    app.use(morgan('dev'));
}

app.use(express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

export default app;
