import express from "express";
import { tasksRouter } from "./tasks";
import { usersRouter } from "./users";

export const router = express.Router();

router.get("/", (_, res) => {
  res.json({ status: "NTask API" });
});

router.use(tasksRouter);
router.use(usersRouter);
