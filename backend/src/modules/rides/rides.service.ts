import { RideStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import { serializeRideSummary } from "../users/user.presenter";

async function getLocationByName(name: string) {
  return prisma.location.findFirst({
    where: {
      name
    }
  });
}

export async function listRides() {
  const rides = await prisma.ride.findMany({
    include: {
      origin: true,
      destination: true,
      driver: true
    },
    orderBy: {
      departureAt: "asc"
    }
  });

  return rides.map(serializeRideSummary);
}

export async function searchRides(params: Record<string, string | undefined>) {
  const rides = await listRides();

  return rides.filter((ride) => {
    const fromOk = params.from
      ? ride.origin.toLowerCase().includes(params.from.toLowerCase())
      : true;
    const toOk = params.to
      ? ride.destination.toLowerCase().includes(params.to.toLowerCase())
      : true;
    const seatsOk = params.seats ? ride.availableSeats >= Number(params.seats) : true;
    const maxPriceOk = params.maxPrice ? ride.price <= Number(params.maxPrice) : true;
    const minRatingOk = params.minDriverRating ? ride.driver.rating >= Number(params.minDriverRating) : true;

    return fromOk && toOk && seatsOk && maxPriceOk && minRatingOk;
  });
}

export async function getRideById(id: string) {
  const ride = await prisma.ride.findUnique({
    where: { id },
    include: {
      origin: true,
      destination: true,
      driver: true
    }
  });

  if (!ride) {
    throw new AppError("Vožnja nije pronađena.", 404);
  }

  return serializeRideSummary(ride);
}

export async function createRide(
  driverId: string,
  payload: {
    origin: string;
    destination: string;
    departureAt: string;
    totalSeats: number;
    availableSeats: number;
    price: number;
    note?: string;
  }
) {
  if (payload.availableSeats > payload.totalSeats) {
    throw new AppError("Broj slobodnih mesta ne može biti veći od ukupnog broja mesta.", 400);
  }

  const [origin, destination, driver] = await Promise.all([
    getLocationByName(payload.origin),
    getLocationByName(payload.destination),
    prisma.user.findUnique({ where: { id: driverId } })
  ]);

  if (!origin || !destination) {
    throw new AppError("Polazište ili odredište ne postoje u sistemu.", 400);
  }

  if (!driver) {
    throw new AppError("Vozač nije pronađen.", 404);
  }

  const ride = await prisma.ride.create({
    data: {
      driverId,
      originId: origin.id,
      destinationId: destination.id,
      departureAt: new Date(payload.departureAt),
      totalSeats: payload.totalSeats,
      availableSeats: payload.availableSeats,
      price: payload.price,
      note: payload.note,
      driverRating: driver.rating,
      status: RideStatus.PUBLISHED
    },
    include: {
      origin: true,
      destination: true,
      driver: true
    }
  });

  return serializeRideSummary(ride);
}
