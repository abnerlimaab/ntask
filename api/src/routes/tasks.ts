import { prisma } from "../prisma";
import express from "express";

export const tasksRouter = express.Router();

tasksRouter.get("/tasks", async (_, res) => {
  const tasks = await prisma.task.findMany();

  res.json({
    tasks: tasks,
  });
});
