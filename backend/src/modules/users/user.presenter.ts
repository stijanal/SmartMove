import type { Ride, User } from "@prisma/client";

export function serializeUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    rating: user.rating,
    isVerified: user.isVerified,
    activeMode: user.activeMode,
    createdAt: user.createdAt
  };
}

export function serializeProfile(user: User) {
  return {
    ...serializeUser(user),
    birthDate: user.birthDate
  };
}

export function serializeRideSummary(
  ride: Ride & {
    origin: { name: string };
    destination: { name: string };
    driver: User;
  }
) {
  return {
    id: ride.id,
    departureAt: ride.departureAt,
    totalSeats: ride.totalSeats,
    availableSeats: ride.availableSeats,
    price: ride.price,
    note: ride.note,
    status: ride.status,
    origin: ride.origin.name,
    destination: ride.destination.name,
    driver: {
      id: ride.driver.id,
      fullName: `${ride.driver.firstName} ${ride.driver.lastName ?? ""}`.trim(),
      rating: ride.driver.rating,
      isVerified: ride.driver.isVerified
    }
  };
}
