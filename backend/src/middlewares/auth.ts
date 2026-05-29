import type { NextFunction, Request, Response } from "express";
import type { UserMode } from "@prisma/client";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../utils/app-error";

type AuthPayload = {
  sub: string;
  email: string;
  activeMode: UserMode;
};

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return next(new AppError("Nedostaje Bearer token.", 401));
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AuthPayload;
    req.user = {
      id: payload.sub,
      email: payload.email,
      activeMode: payload.activeMode
    };
    return next();
  } catch {
    return next(new AppError("Token nije validan ili je istekao.", 401));
  }
}
