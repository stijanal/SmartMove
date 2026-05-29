import { Router } from "express";
import { requireAuth } from "../../middlewares/auth";
import { validateBody } from "../../middlewares/validate";
import { asyncHandler } from "../../utils/async-handler";
import { successResponse } from "../../utils/api-response";
import { createRideSchema } from "./ride.schemas";
import { createRide, getRideById, listRides, searchRides } from "./rides.service";

export const ridesRouter = Router();

ridesRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const rides = await listRides();
    res.json(successResponse("Vožnje su uspešno učitane.", rides, { implemented: true, total: rides.length }));
  })
);

ridesRouter.get(
  "/search",
  asyncHandler(async (req, res) => {
    const rides = await searchRides({
      from: typeof req.query.from === "string" ? req.query.from : undefined,
      to: typeof req.query.to === "string" ? req.query.to : undefined,
      seats: typeof req.query.seats === "string" ? req.query.seats : undefined,
      maxPrice: typeof req.query.maxPrice === "string" ? req.query.maxPrice : undefined,
      minDriverRating:
        typeof req.query.minDriverRating === "string" ? req.query.minDriverRating : undefined
    });

    res.json(
      successResponse("Pretraga vožnji je uspešna.", rides, {
        implemented: true,
        total: rides.length
      })
    );
  })
);

ridesRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const rideId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const ride = await getRideById(rideId);
    res.json(successResponse("Detalji vožnje su uspešno učitani.", ride, { implemented: true }));
  })
);

ridesRouter.post(
  "/",
  requireAuth,
  validateBody(createRideSchema),
  asyncHandler(async (req, res) => {
    const ride = await createRide(req.user!.id, req.body);
    res.status(201).json(successResponse("Vožnja je uspešno objavljena.", ride, { implemented: true }));
  })
);
