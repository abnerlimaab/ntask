import passport from "passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { prisma } from "./prisma";

import { JWT_SECRET, JWT_SESSION } from "./configs";

export class Passport {
  private static strategy: Strategy;

  private static readonly strategyOptions: StrategyOptions = {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  private static async verifyCallback(payload: any, done: any) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });

      return done(
        null,
        user
          ? {
              id: user.id,
              email: user.email,
            }
          : false
      );
    } catch (error) {
      return done(error, false);
    }
  }

  public static initialize() {
    if (!this.strategy) {
      this.strategy = new Strategy(this.strategyOptions, this.verifyCallback);
    }

    passport.use(this.strategy);
    return passport.initialize();
  }

  public static authenticate() {
    return passport.authenticate("jwt", JWT_SESSION);
  }
}
