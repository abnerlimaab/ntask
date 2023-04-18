import express from "express";
import { router } from "./routes";
import { Passport } from "./auth";

export const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);
app.use(Passport.initialize());

app.listen(PORT, () => {
  console.log(`NTask API - porta ${PORT}.`);
});
