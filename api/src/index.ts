import express from "express";
import { router } from "./routes";

export const app = express();
const PORT = 3000;

app.use(router);

app.listen(PORT, () => {
  console.log(`NTask API - porta ${PORT}.`);
});
