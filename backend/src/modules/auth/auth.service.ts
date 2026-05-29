import { UserMode } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import { serializeUser } from "../users/user.presenter";

type RegisterInput = {
  firstName: string;
  lastName?: string;
  phone?: string;
  birthDate?: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

function signToken(user: { id: string; email: string; activeMode: UserMode }) {
  const expiresIn = env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"];

  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      activeMode: user.activeMode
    },
    env.JWT_SECRET,
    {
      expiresIn
    }
  );
}

export async function registerUser(input: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email }
  });

  if (existingUser) {
    throw new AppError("Korisnik sa tim email-om već postoji.", 409);
  }

  const passwordHash = await bcrypt.hash(input.password, 10);
  const user = await prisma.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      birthDate: input.birthDate ? new Date(input.birthDate) : null,
      email: input.email,
      passwordHash,
      activeMode: UserMode.PASSENGER
    }
  });

  return {
    token: signToken(user),
    user: serializeUser(user)
  };
}

export async function loginUser(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: input.email }
  });

  if (!user) {
    throw new AppError("Korisnik ne postoji.", 401);
  }

  const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);
  if (!passwordMatches) {
    throw new AppError("Pogrešna lozinka.", 401);
  }

  return {
    token: signToken(user),
    user: serializeUser(user)
  };
}

export async function getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new AppError("Korisnik nije pronađen.", 404);
  }

  return serializeUser(user);
}
