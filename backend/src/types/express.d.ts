import type { UserMode } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        activeMode: UserMode;
      };
    }
  }
}

export {};
