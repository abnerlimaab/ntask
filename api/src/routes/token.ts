import express from "express";
import jwt from "jwt-simple";

import { prisma } from "../prisma";
import { compareHash } from "../utils";
import { JWT_SECRET } from "../configs";

export const tokenRouter = express.Router();

tokenRouter.post("/token", async (req, res) => {
  if (req.body.email && req.body.password) {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user && compareHash(password, user.password)) {
        const payload = { id: user.id };
        const token = jwt.encode(payload, JWT_SECRET);

        res.json({ token });
        return;
      }

      res.sendStatus(401);
    } catch (err: any) {
      res.status(412).json({ msg: err.message });
    }
  } else {
    res.sendStatus(401);
  }
});
