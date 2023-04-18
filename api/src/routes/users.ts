import express from "express";
import { encrypt, getUserId } from "../utils";
import { prisma } from "../prisma";
import { Passport } from "../auth";

export const usersRouter = express.Router();

usersRouter
  .route("/user")
  .all(Passport.authenticate())
  .get(async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(getUserId(req)),
        },
      });

      if (user === null) {
        res.status(404).json({ msg: "Usuário não encontrado" });
        return;
      }

      res.json({
        user: {
          ...user,
          password: undefined,
        },
      });
    } catch {
      res.status(412).json({ msg: "Não foi possível retornar o usuário" });
    }
  })
  .delete(async (req, res) => {
    try {
      await prisma.user.delete({
        where: {
          id: Number(getUserId(req)),
        },
      });

      res.sendStatus(204);
    } catch {
      res.status(412).json({ msg: "Não foi possível deletar o usuário." });
    }
  });

usersRouter.post("/users", async (req, res) => {
  try {
    const password = await encrypt(req.body.password);

    const user = await prisma.user.create({
      data: {
        ...req.body,
        password,
      },
    });

    res.json({
      user: {
        ...user,
        password: undefined,
      },
    });
  } catch (err: any) {
    res.status(412).json({ msg: err.message });
  }
});
