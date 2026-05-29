import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { successResponse } from "../../utils/api-response";
import { requireAuth } from "../../middlewares/auth";
import { validateBody } from "../../middlewares/validate";
import { loginSchema, registerSchema } from "./auth.schemas";
import { getCurrentUser, loginUser, registerUser } from "./auth.service";

export const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  asyncHandler(async (req, res) => {
    const result = await registerUser(req.body);
    res.status(201).json(successResponse("Registracija je uspešna.", result, { implemented: true }));
  })
);

authRouter.post(
  "/login",
  validateBody(loginSchema),
  asyncHandler(async (req, res) => {
    const result = await loginUser(req.body);
    res.json(successResponse("Prijava je uspešna.", result, { implemented: true }));
  })
);

authRouter.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await getCurrentUser(req.user!.id);
    res.json(successResponse("Trenutni korisnik je uspešno učitan.", user, { implemented: true }));
  })
);
