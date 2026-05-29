import { Router } from "express";
import { requireAuth } from "../../middlewares/auth";
import { mocked } from "../../utils/mock-response";

export const vehiclesRouter = Router();

vehiclesRouter.get("/me", requireAuth, (_req, res) => {
  res.json(
    mocked("Podaci o vozilu su vraćeni iz demo sloja.", {
      model: "Audi A4 (2021)",
      registration: "KG-123-XX",
      seats: 4
    })
  );
});

vehiclesRouter.put("/me", requireAuth, (req, res) => {
  res.json(
    mocked("Ažuriranje vozila je simulirano kroz stub endpoint.", {
      receivedPayload: req.body
    })
  );
});
