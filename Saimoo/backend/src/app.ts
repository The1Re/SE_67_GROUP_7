import express from 'express';
import cors from 'cors';
import routes from './routes';
import morgan from 'morgan';

const app = express();

app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);

export default app;
