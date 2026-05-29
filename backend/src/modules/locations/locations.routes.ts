import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { asyncHandler } from "../../utils/async-handler";
import { successResponse } from "../../utils/api-response";

export const locationsRouter = Router();

locationsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const query = typeof req.query.query === "string" ? req.query.query.trim().toLowerCase() : "";
    const locations = await prisma.location.findMany({
      orderBy: { name: "asc" }
    });

    const filtered = query
      ? locations.filter((location) => location.name.toLowerCase().includes(query))
      : locations;

    res.json(
      successResponse(
        "Lokacije su uspešno učitane.",
        filtered.map((location) => ({
          id: location.id,
          name: location.name
        })),
        { implemented: true, total: filtered.length }
      )
    );
  })
);
