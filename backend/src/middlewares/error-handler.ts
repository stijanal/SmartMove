import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/app-error";
import { errorResponse } from "../utils/api-response";

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ZodError) {
    return res.status(400).json(
      errorResponse("Validacija nije prošla.", error.flatten().fieldErrors)
    );
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json(errorResponse(error.message, error.errors));
  }

  console.error(error);
  return res.status(500).json(errorResponse("Došlo je do neočekivane greške na serveru."));
}
