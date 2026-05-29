import { successResponse } from "./api-response";

export function mocked(message: string, data: unknown) {
  return successResponse(message, data, {
    mock: true,
    implemented: false
  });
}
