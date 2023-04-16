import { Sequelize } from "sequelize";

class Database {
  private static instance: Sequelize;

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      Database.instance = new Sequelize({
        dialect: "sqlite",
        storage: "./database/ntask.sqlite",
      });
    }
    return Database.instance;
  }
}

export default Database.getInstance();
