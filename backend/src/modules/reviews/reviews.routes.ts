import { Router } from "express";
import { requireAuth } from "../../middlewares/auth";
import { mocked } from "../../utils/mock-response";

export const reviewsRouter = Router();

reviewsRouter.get("/me", requireAuth, (_req, res) => {
  res.json(
    mocked("Recenzije su vraćene iz demo sloja.", [
      {
        id: "rev-1",
        author: "Marko P.",
        rating: 5,
        comment: "Sjajan putnik!"
      }
    ])
  );
});
