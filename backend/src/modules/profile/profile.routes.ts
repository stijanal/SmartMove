import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { requireAuth } from "../../middlewares/auth";
import { asyncHandler } from "../../utils/async-handler";
import { AppError } from "../../utils/app-error";
import { successResponse } from "../../utils/api-response";
import { mocked } from "../../utils/mock-response";
import { serializeProfile } from "../users/user.presenter";

export const profileRouter = Router();

profileRouter.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id }
    });

    if (!user) {
      throw new AppError("Korisnik nije pronađen.", 404);
    }

    res.json(successResponse("Profil je uspešno učitan.", serializeProfile(user), { implemented: true }));
  })
);

profileRouter.put("/me", requireAuth, (req, res) => {
  res.json(
    mocked("Ažuriranje profila je trenutno predstavljeno kroz ugovoreni stub odgovor.", {
      receivedPayload: req.body,
      profile: {
        id: req.user!.id,
        note: "U realnoj implementaciji ovde bi se sačuvale izmene osnovnih podataka korisnika."
      }
    })
  );
});
