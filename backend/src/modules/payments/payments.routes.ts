import { Router } from "express";
import { requireAuth } from "../../middlewares/auth";
import { mocked } from "../../utils/mock-response";

export const paymentsRouter = Router();

paymentsRouter.get("/methods", requireAuth, (_req, res) => {
  res.json(
    mocked("Načini plaćanja su vraćeni iz demo sloja.", [
      {
        id: "card-1",
        type: "Visa",
        maskedNumber: "**** 4321"
      },
      {
        id: "wallet-1",
        type: "Wallet",
        balance: 24.5,
        currency: "EUR"
      }
    ])
  );
});
