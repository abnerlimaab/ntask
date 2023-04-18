import express from "express";
import { tasksRouter } from "./tasks";
import { usersRouter } from "./users";
import { tokenRouter } from "./token";

export const router = express.Router();

router.get("/", (_, res) => {
  res.json({ status: "NTask API" });
});

router.use(tasksRouter);
router.use(usersRouter);
router.use(tokenRouter);
