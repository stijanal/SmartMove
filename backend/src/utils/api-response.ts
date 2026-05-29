export function successResponse<T>(message: string, data: T, meta?: unknown) {
  return {
    success: true,
    message,
    data,
    ...(meta ? { meta } : {})
  };
}

export function errorResponse(message: string, errors?: unknown) {
  return {
    success: false,
    message,
    data: null,
    ...(errors ? { errors } : {})
  };
}
