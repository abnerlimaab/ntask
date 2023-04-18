import express from "express";
import { prisma } from "../prisma";
import { Passport } from "../auth";
import { getUserId } from "../utils";

export const tasksRouter = express.Router();

tasksRouter
  .route("/tasks")
  .all(Passport.authenticate())
  .get(async (req, res) => {
    try {
      const tasks = await prisma.task.findMany({
        where: {
          userId: getUserId(req),
        },
      });

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
        data: {
          ...req.body,
          userId: getUserId(req),
        },
      });

      res.json(task);
    } catch {
      res.status(412).json({ msg: "Não foi possível adicionar a tarefa." });
    }
  });

tasksRouter
  .route("/tasks/:id")
  .all(Passport.authenticate())
  .get(async (req, res) => {
    try {
      const task = await prisma.task.findFirst({
        where: {
          id: Number(req.params.id),
          userId: getUserId(req),
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
      const task = await prisma.task.updateMany({
        where: {
          id: Number(req.params.id),
          userId: getUserId(req),
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
      await prisma.task.deleteMany({
        where: {
          id: Number(req.params.id),
          userId: getUserId(req),
        },
      });

      res.sendStatus(204);
    } catch {
      res.status(412).json({ msg: "Não foi possível remover a tarefa." });
    }
  });
