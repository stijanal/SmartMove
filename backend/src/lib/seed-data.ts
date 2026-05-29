import { PrismaClient, UserMode } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function seedDatabase(prisma: PrismaClient) {
  await prisma.ride.deleteMany();
  await prisma.location.deleteMany();
  await prisma.user.deleteMany();

  const locations = await Promise.all(
    [
      "Kragujevac",
      "Beograd",
      "Novi Sad",
      "Niš",
      "Kraljevo",
      "Trstenik",
      "Vrnjačka Banja",
      "Čačak",
      "Aerodrom Beograd"
    ].map((name) => prisma.location.create({ data: { name } }))
  );

  const locationByName = new Map(locations.map((location) => [location.name, location]));
  const passwordHash = await bcrypt.hash("Trava123", 10);

  const tijana = await prisma.user.create({
    data: {
      email: "stijanal@gmail.com",
      passwordHash,
      firstName: "Tijana",
      lastName: "Lukač",
      phone: "+38160123456",
      birthDate: new Date("1999-04-21"),
      rating: 4.8,
      isVerified: true,
      activeMode: UserMode.BOTH
    }
  });

  const marko = await prisma.user.create({
    data: {
      email: "marko.nikolic@smartmove.rs",
      passwordHash,
      firstName: "Marko",
      lastName: "Nikolić",
      phone: "+381641112223",
      birthDate: new Date("1995-06-15"),
      rating: 4.9,
      isVerified: true,
      activeMode: UserMode.DRIVER
    }
  });

  const milan = await prisma.user.create({
    data: {
      email: "milan@smartmove.rs",
      passwordHash,
      firstName: "Milan",
      lastName: "Petrović",
      phone: "+381651234321",
      birthDate: new Date("1992-02-11"),
      rating: 4.7,
      isVerified: true,
      activeMode: UserMode.DRIVER
    }
  });

  await prisma.ride.createMany({
    data: [
      {
        driverId: marko.id,
        originId: locationByName.get("Kragujevac")!.id,
        destinationId: locationByName.get("Beograd")!.id,
        departureAt: new Date("2026-06-01T12:00:00.000Z"),
        totalSeats: 4,
        availableSeats: 3,
        price: 12,
        note: "Idem direktno na terminal 1, imam dosta mesta u gepeku.",
        driverRating: 4.9
      },
      {
        driverId: milan.id,
        originId: locationByName.get("Kragujevac")!.id,
        destinationId: locationByName.get("Aerodrom Beograd")!.id,
        departureAt: new Date("2026-06-01T10:30:00.000Z"),
        totalSeats: 4,
        availableSeats: 2,
        price: 10,
        note: "Polazak sa centralne autobuske stanice.",
        driverRating: 4.7
      },
      {
        driverId: tijana.id,
        originId: locationByName.get("Niš")!.id,
        destinationId: locationByName.get("Kragujevac")!.id,
        departureAt: new Date("2026-06-02T08:00:00.000Z"),
        totalSeats: 3,
        availableSeats: 1,
        price: 8,
        note: "Kraća pauza na pola puta.",
        driverRating: 4.8
      }
    ]
  });
}
