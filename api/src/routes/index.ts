import express from 'express';
import { tasksRouter } from './tasks';

export const router = express.Router();

router.get('/', (_, res) => {
    res.json({ status: 'NTask API' });
});

router.use(tasksRouter);