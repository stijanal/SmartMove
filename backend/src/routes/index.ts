import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes";
import { chatRouter } from "../modules/chat/chat.routes";
import { locationsRouter } from "../modules/locations/locations.routes";
import { paymentsRouter } from "../modules/payments/payments.routes";
import { profileRouter } from "../modules/profile/profile.routes";
import { reviewsRouter } from "../modules/reviews/reviews.routes";
import { ridesRouter } from "../modules/rides/rides.routes";
import { vehiclesRouter } from "../modules/vehicles/vehicles.routes";
import { verificationsRouter } from "../modules/verifications/verifications.routes";
import { successResponse } from "../utils/api-response";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json(
    successResponse(
      "SmartMove backend radi ispravno.",
      {
        status: "ok",
        timestamp: new Date().toISOString()
      },
      { implemented: true }
    )
  );
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/locations", locationsRouter);
apiRouter.use("/rides", ridesRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/", chatRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/payments", paymentsRouter);
apiRouter.use("/vehicles", vehiclesRouter);
apiRouter.use("/verifications", verificationsRouter);
