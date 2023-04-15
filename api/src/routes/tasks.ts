import express from 'express';

export const tasksRouter = express.Router();

tasksRouter.get("/tasks", (_, res) => {
    res.json({
        tasks: [
            { title: "Fazer compras" },
            { title: "Consertar o PC" }
        ]
    });
});