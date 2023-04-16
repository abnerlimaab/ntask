import express from "express";
import { router } from "./routes";
import sequelize from "./sequelize";

export const app = express();
const PORT = 3000;

app.use(router);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`NTask API - porta ${PORT}.`);
  });
});
