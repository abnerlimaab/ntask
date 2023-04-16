import { prisma } from "../prisma";
import express from "express";

export const tasksRouter = express.Router();

tasksRouter
  .route("/tasks")
  .get(async (_, res) => {
    try {
      const tasks = await prisma.task.findMany();

      res.json({
        tasks: tasks,
      });
    } catch {
      res.status(412).json({ msg: "Não foi possível retornar as tarefas" });
    }
  })
  .post(async (req, res) => {
    try {
      const task = await prisma.task.create({
        data: req.body,
      });

      res.json(task);
    } catch {
      res.status(412).json({ msg: "Não foi possível adicionar a tarefa." });
    }
  });

tasksRouter
  .route("/tasks/:id")
  .get(async (req, res) => {
    try {
      const task = await prisma.task.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });

      if (task === null) {
        res.status(404).json({ msg: "Tarefa não encontrada" });
        return;
      }

      res.json({
        task: task,
      });
    } catch {
      res.status(412).json({ msg: "Não foi possível retornar a tarefa" });
    }
  })
  .put(async (req, res) => {
    try {
      const task = await prisma.task.update({
        where: {
          id: Number(req.params.id),
        },
        data: req.body,
      });

      res.json(task);
    } catch {
      res.status(412).json({ msg: "Não foi possível atualizar a tarefa." });
    }
  })
  .delete(async (req, res) => {
    try {
      await prisma.task.delete({
        where: {
          id: Number(req.params.id),
        },
      });

      res.sendStatus(204);
    } catch {
      res.status(412).json({ msg: "Não foi possível remover a tarefa." });
    }
  });
