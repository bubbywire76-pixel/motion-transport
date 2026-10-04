import axios from "axios";

export function serviceError(error: unknown, serviceName: string): Error {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error : new Error(`${serviceName} failed.`);
  }

  if (!error.response) {
    return new Error(
      `Could not reach the ${serviceName.toLowerCase()} service. Check your connection and try again.`,
    );
  }

  const body = error.response.data as
    | { error?: unknown; message?: unknown }
    | undefined;
  const detail =
    typeof body?.error === "string"
      ? body.error
      : typeof body?.message === "string"
        ? body.message
        : "";

  if (error.response.status === 404) {
    return new Error(
      `Live ${serviceName.toLowerCase()} is not connected to the Motion backend yet. No transaction was made.`,
    );
  }

  return new Error(
    detail || `${serviceName} failed with status ${error.response.status}.`,
  );
}
