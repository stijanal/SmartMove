import { Router } from "express";
import { requireAuth } from "../../middlewares/auth";
import { mocked } from "../../utils/mock-response";

export const verificationsRouter = Router();

verificationsRouter.get("/me", requireAuth, (_req, res) => {
  res.json(
    mocked("Status verifikacije je vraćen iz demo sloja.", {
      driverLicense: {
        status: "verified",
        verifiedAt: "2026-05-01T12:00:00.000Z"
      },
      identityCheck: {
        status: "verified"
      }
    })
  );
});
