import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export const encrypt = async (value: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hash(value, salt);
};

export const compareHash = (value: string, hash: string) =>
  bcrypt.compareSync(value, hash);

export const getUserId = (req: Express.Request) => {
  const user = req.user as User | undefined;
  return user?.id;
};
