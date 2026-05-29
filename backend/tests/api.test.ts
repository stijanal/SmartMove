import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PrismaClient } from "@prisma/client";
import { app } from "../src/app";
import { seedDatabase } from "../src/lib/seed-data";

const prisma = new PrismaClient();

describe("SmartMove API", () => {
  let token = "";

  beforeAll(async () => {
    await seedDatabase(prisma);

    const loginResponse = await request(app).post("/api/v1/auth/login").send({
      email: "stijanal@gmail.com",
      password: "Trava123"
    });

    token = loginResponse.body.data.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("vraća health status", async () => {
    const response = await request(app).get("/api/v1/health");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe("ok");
  });

  it("izlaže Swagger JSON", async () => {
    const response = await request(app).get("/api-docs.json");

    expect(response.status).toBe(200);
    expect(response.body.openapi).toBe("3.0.3");
  });

  it("registruje novog korisnika", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      firstName: "Ana",
      email: "ana@example.com",
      password: "Lozinka123"
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeTruthy();
  });

  it("odbija dupli email", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      firstName: "Ana",
      email: "stijanal@gmail.com",
      password: "Lozinka123"
    });

    expect(response.status).toBe(409);
    expect(response.body.success).toBe(false);
  });

  it("zahteva token za profil", async () => {
    const response = await request(app).get("/api/v1/profile/me");

    expect(response.status).toBe(401);
  });

  it("vraća profil sa tokenom", async () => {
    const response = await request(app)
      .get("/api/v1/profile/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.email).toBe("stijanal@gmail.com");
  });

  it("pretražuje vožnje po relaciji", async () => {
    const response = await request(app).get("/api/v1/rides/search?from=Kragujevac&to=Beograd");

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it("objavljuje vožnju", async () => {
    const response = await request(app)
      .post("/api/v1/rides")
      .set("Authorization", `Bearer ${token}`)
      .send({
        origin: "Kragujevac",
        destination: "Beograd",
        departureAt: "2026-06-05T10:00:00.000Z",
        totalSeats: 4,
        availableSeats: 2,
        price: 15,
        note: "Demo vožnja za test."
      });

    expect(response.status).toBe(201);
    expect(response.body.data.origin).toBe("Kragujevac");
  });

  it("validira obavezna polja pri objavi vožnje", async () => {
    const response = await request(app)
      .post("/api/v1/rides")
      .set("Authorization", `Bearer ${token}`)
      .send({
        origin: "Kragujevac"
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("vraća mock shape za chat endpoint", async () => {
    const response = await request(app)
      .get("/api/v1/conversations")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.meta.mock).toBe(true);
  });

  it("vraća mock shape za payments endpoint", async () => {
    const response = await request(app)
      .get("/api/v1/payments/methods")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.meta.mock).toBe(true);
  });
});
