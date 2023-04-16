import { prisma } from "../prisma";
import express from "express";

export const usersRouter = express.Router();

usersRouter.get("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (user === null) {
      res.status(404).json({ msg: "Usuário não encontrado" });
      return;
    }

    res.json({
      user: user,
    });
  } catch {
    res.status(412).json({ msg: "Não foi possível retornar o usuário" });
  }
});

usersRouter.post("/users", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: req.body,
    });

    res.json(user);
  } catch (err: any) {
    res.status(412).json({ msg: err.message });
  }
});

usersRouter.delete("/users/:id", async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.sendStatus(204);
  } catch {
    res.status(412).json({ msg: "Não foi possível deletar o usuário." });
  }
});
